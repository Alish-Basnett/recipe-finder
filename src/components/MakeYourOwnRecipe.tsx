import React, { useState, useEffect } from "react";
import {
  filterMealsByIngredient,
  checkIngredientInMeals,
} from "@/api/mealAPIs";
import { Meal } from "../types/types";
import RecipeCard from "./RecipeCard";

interface MakeYourOwnRecipeProps {
  recipes: Meal[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
}

const MakeYourOwnRecipe: React.FC<MakeYourOwnRecipeProps> = ({
  recipes,
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  const [ingredient, setIngredient] = useState(searchQuery);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [meals, setMeals] = useState<Meal[]>(recipes);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [ingredientMatchStatus, setIngredientMatchStatus] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (searchQuery) {
      setIngredient(searchQuery);
      handleSearch();
    }
  }, [searchQuery, handleSearch]);

  const handleAddIngredient = () => {
    const trimmedIngredient = ingredient.trim();
    if (trimmedIngredient && !ingredientsList.includes(trimmedIngredient)) {
      setIngredientsList([...ingredientsList, trimmedIngredient]);
      setIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredientsList(ingredientsList.filter((i) => i !== ingredientToRemove));
  };

  const performSearch = async () => {
    if (ingredientsList.length === 0) return;

    setSearching(true);
    setError("");

    try {
      const results = await Promise.all(
        ingredientsList.map((i) => checkIngredientInMeals(i))
      );

      const updatedMatchStatus: Record<string, boolean> = {};

      ingredientsList.forEach((ingredient, index) => {
        updatedMatchStatus[ingredient] = results[index];
      });

      setIngredientMatchStatus(updatedMatchStatus);

      const matchedIngredients = ingredientsList.filter(
        (_, index) => results[index]
      );
      const combinedResults = await Promise.all(
        matchedIngredients.map((i) => filterMealsByIngredient(i))
      );

      const allMeals = combinedResults.flat();
      setMeals(allMeals);

      if (allMeals.length === 0) {
        setError("No recipes found for the ingredients you entered.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const handleSearchClick = () => {
    handleSearch();
    performSearch();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">
        Find Recipes by Ingredients
      </h2>

      <div className="mb-6 relative flex items-center">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Enter ingredients..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddIngredient();
          }}
          className="w-full pr-14 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M10 16a6 6 0 100-12 6 6 0 000 12z"
            />
          </svg>
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {ingredientsList.map((ing) => (
          <div
            key={ing}
            className={`py-2 px-4 rounded-full flex items-center space-x-2 ${
              ingredientMatchStatus[ing] === true
                ? "bg-green-200 text-green-800"
                : ingredientMatchStatus[ing] === false
                ? "bg-red-200 text-red-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <span>{ing}</span>
            <button
              onClick={() => handleRemoveIngredient(ing)}
              className={`text-${
                ingredientMatchStatus[ing] ? "green" : "gray"
              }-800 hover:text-${
                ingredientMatchStatus[ing] ? "green" : "gray"
              }-600`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {searching && <p className="text-gray-500">Searching...</p>}
      {error && !searching && (
        <div className="mt-4 text-center text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto mb-4 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 11.897a1 1 0 001.902.707l-.896 3.15a1 1 0 01-1.902-.707l.896-3.15zM12 16h.01M12 8v4m6.93-3.347a9.969 9.969 0 00-1.686-3.392A9.973 9.973 0 0020 12a9.973 9.973 0 00-2.756 4.447 9.97 9.97 0 00-1.314-3.442A10.015 10.015 0 0012 4a10.015 10.015 0 00-4.93 1.652A9.97 9.97 0 006.756 12 9.973 9.973 0 004 16.447 9.969 9.969 0 0012 20a9.969 9.969 0 009.97-9.97c0-2.448-.784-4.73-2.108-6.553z"
            />
          </svg>
          {error}
        </div>
      )}

      <div className="recipe-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {meals.map((meal) => (
          <RecipeCard key={meal.idMeal} recipe={meal} />
        ))}
      </div>
    </div>
  );
};

export default MakeYourOwnRecipe;
