// Instanciate the Classes
const ui = new UI(),
  cocktailAPI = new CocktailAPI(),
  cocktailDB = new CocktailDB();

function eventListeners() {

  document.addEventListener('DOMContentLoaded', documentReady);

  const searchForm = document.querySelector('#search-form');
  searchForm.addEventListener('submit', getCocktails);

  const cocktailList = document.querySelector('#cocktail-list');
  //cocktailList.addEventListener('click', resultsDelegation);
}
eventListeners();


function getCocktails(e) {
  e.preventDefault();

  const searchType = document.querySelector('#search-type').value;
  const searchTerm = document.querySelector('#search-term').value;

  console.log('-> ', searchTerm);

  if (!searchTerm) {
    ui.printMessage('Please add something into the form', 'danger');
    return false;
  }

  let serverResponse;

  switch (searchType) {
    case 'name':
      serverResponse = cocktailAPI.getDrinksByName(searchTerm);
      break;
    case 'ingredient':
      serverResponse = cocktailAPI.getDrinksByIngredient(searchTerm);
      break;
  }

  ui.clearResults();

  serverResponse.then(cocktails => {
    if (cocktails.cocktails.drinks === null) {

      ui.printMessage('There\'re no results, try a different term ', 'danger');
    } else {
      if (searchType === 'name') {
        // Display with ingredients
        ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
      } else {
        // Display without Ingredients (category, alcohol, ingredient)
        ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
      }
    }
  })
}

// Delegation for the #results area
function resultsDelegation(e) {
  e.preventDefault();

  if (e.target.classList.contains('get-recipe')) {
    cocktailAPI.getSingleRecipe(e.target.dataset.id)
      .then(recipe => {
        // Displays single recipe into a modal
        ui.displaySingleRecipe(recipe.recipe.drinks[0]);

      })
  }

  // When favorite btn is clicked
  if (e.target.classList.contains('favorite-btn')) {
    if (e.target.classList.contains('is-favorite')) {
      // remove the class
      e.target.classList.remove('is-favorite');
      e.target.textContent = '+';

      // Remove from Storage
      cocktailDB.removeFromDB(e.target.dataset.id);
    } else {
      // Add the class
      e.target.classList.add('is-favorite');
      e.target.textContent = '-';

      // Get Info
      const cardBody = e.target.parentElement;

      const drinkInfo = {
        id: e.target.dataset.id,
        name: cardBody.querySelector('.card-title').textContent,
        image: cardBody.querySelector('.card-img-top').src
      }

      // console.log(drinkInfo);
      // Add into the storage
      cocktailDB.saveIntoDB(drinkInfo);
    }
  }

}

// Document Ready
function documentReady() {
  // Display on load the favorites from storage
  ui.isFavorite();

  // Select the search category select
  const searchCategory = document.querySelector('.search-category');
  searchCategory && ui.displayCategories();

  // When favorites page
  const favoritesTable = document.querySelector('#favorites');
  if (favoritesTable) {
    // Get the favorites from storage and display them
    const drinks = cocktailDB.getFromDB();
    ui.displayFavorites(drinks);

    // When view or delete are clicked

    favoritesTable.addEventListener('click', (e) => {
      e.preventDefault();

      // Delegation
      if (e.target.classList.contains('get-recipe')) {
        cocktailAPI.getSingleRecipe(e.target.dataset.id)
          .then(recipe => {
            // Displays single recipe into a modal
            ui.displaySingleRecipe(recipe.recipe.drinks[0]);

          })
      }
      // When remove button is clicked in favorites
      if (e.target.classList.contains('remove-recipe')) {
        // Remove from dom
        ui.removeFavorite(e.target.parentElement.parentElement);

        // Remove from the Local Storage
        cocktailDB.removeFromDB(e.target.dataset.id);
      }
    })
  }
}
