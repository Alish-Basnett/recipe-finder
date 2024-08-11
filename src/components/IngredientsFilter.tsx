"use client";

import React, { useState } from "react";
import { filterMealsByIngredient } from "../api/mealAPIs";

const IngredientsFilter: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddIngredient = () => {
    if (ingredientInput && !ingredients.includes(ingredientInput)) {
      setIngredients([...ingredients, ingredientInput]);
    }
    setIngredientInput("");
  };

  const handleSearchByIngredients = async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await Promise.all(
        ingredients.map((ingredient) => filterMealsByIngredient(ingredient))
      );
      const uniqueRecipes = Array.from(
        new Set(results.flat().map((recipe) => recipe.idMeal))
      ).map((id) => results.flat().find((recipe) => recipe.idMeal === id));

      setRecipes(uniqueRecipes || []);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ingredients-filter my-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Search by Ingredients</h2>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          placeholder="Enter an ingredient"
        />
        <button
          onClick={handleAddIngredient}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {ingredients.map((ingredient, index) => (
          <span
            key={index}
            className="bg-blue-200 text-blue-800 px-2 py-1 rounded"
          >
            {ingredient}
          </span>
        ))}
      </div>
      <button
        onClick={handleSearchByIngredients}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Search Recipes
      </button>

      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      <div className="recipe-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <h3>{recipe.strMeal}</h3>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </div>
          ))
        ) : (
          <p className="text-center">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default IngredientsFilter;
