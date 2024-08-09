import axios from "axios";

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Search meals by name
export const searchMealsByName = async (query: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.php?s=${query}`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by name:", error);
    throw error;
  }
};

// List all meals by first letter
export const listMealsByFirstLetter = async (letter: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.php?f=${letter}`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by first letter:", error);
    throw error;
  }
};

// Lookup full meal details by ID
export const lookupMealById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    throw error;
  }
};

// Lookup a single random meal
export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/random.php`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching random meal:", error);
    throw error;
  }
};

// List all meal categories
export const listMealCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories.php`);
    return response.data.categories || [];
  } catch (error) {
    console.error("Error fetching meal categories:", error);
    throw error;
  }
};

// Filter meals by main ingredient
export const filterMealsByIngredient = async (ingredient: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/filter.php?i=${ingredient}`
    );
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by ingredient:", error);
    throw error;
  }
};

// Filter meals by category
export const getMealsByCategory = async (category: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/filter.php?c=${category}`
    );
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    throw error;
  }
};

// Filter meals by area
export const filterMealsByArea = async (area: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filter.php?a=${area}`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by area:", error);
    throw error;
  }
};
