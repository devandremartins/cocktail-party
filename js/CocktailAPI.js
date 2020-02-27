class CocktailAPI {
  constructor() {
    //https://cors-anywhere.herokuapp.com/
    this.apiUrl = 'http://www.thecocktaildb.com/api/json/v1/1';
  }

  async getDrinksByName(name) {
    const apiResponse = await fetch(`${this.apiUrl}/search.php?s=${name}`);
    const cocktails = await apiResponse.json();
    return {
      cocktails
    }
  }

  async getDrinksByIngredient(ingredient) {
    console.log('URL ->', `${this.apiUrl}/filter.php?i=${ingredient}`);
    const apiResponse = await fetch(`${this.apiUrl}/filter.php?i=${ingredient}`);
    const cocktails = await apiResponse.json();
    return {
      cocktails
    }
  }

  // get single recipe
  async getSingleRecipe(id) {
    // Search by Ingredient
    const apiResponse = await fetch(`${this.apiUrl}/lookup.php?i=${id}`);
    // Wait for response then return JSON
    const recipe = await apiResponse.json();

    return {
      recipe
    }
  }

  // Retrieves all the Categories from the REST API
  async getCategories() {
    const apiResponse = await fetch(`${this.apiUrl}/list.php?c=list`);
    // Wait for response and return JSON
    const categories = await apiResponse.json();

    return {
      categories
    }
  }

  // Get Drinks By Category
  async getDrinksByCategory(category) {
    // Search by Category
    const apiResponse = await fetch(`${this.apiUrl}/filter.php?c=${category}`);
    // Wait for response then return JSON
    const cocktails = await apiResponse.json();

    return {
      cocktails
    }
  }

  // Get alcohol or non alcohol drinks
  async getDrinksByAlcohol(term) {
    // Search by Category
    const apiResponse = await fetch(`${this.apiUrl}/filter.php?a=${term}`);
    // Wait for response then return JSON
    const cocktails = await apiResponse.json();

    return {
      cocktails
    }
  }
}
