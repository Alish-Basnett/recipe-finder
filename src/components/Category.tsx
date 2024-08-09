"use client";

import React, { useState, useEffect } from "react";
import { listMealCategories, getMealsByCategory } from "../api/mealAPIs";
import RecipeCard from "./RecipeCard";

const Category: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredMeals, setFilteredMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const results = await listMealCategories();
        setCategories(results || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setLoading(true);
    setError(null);

    try {
      const results = await getMealsByCategory(category);
      setFilteredMeals(results || []);
    } catch (err) {
      setError("Failed to fetch meals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-filter container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Filter by Category
      </h2>

      <div className="mb-8">
        <label htmlFor="category" className="block text-xl font-semibold mb-2">
          Choose a Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.idCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="recipe-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <RecipeCard key={meal.idMeal} recipe={meal} />
          ))
        ) : (
          <p className="text-center">No meals found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
