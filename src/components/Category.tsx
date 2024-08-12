import React, { useState, useEffect, useRef } from "react";
import { listMealCategories, getMealsByCategory } from "../api/mealAPIs";
import RecipeCard from "./RecipeCard";
import { motion } from "framer-motion";

const Category: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredMeals, setFilteredMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Filter by Category
      </h2>

      <div className="relative mb-6">
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-between"
        >
          <span className="text-gray-600">
            {selectedCategory || "Choose a Category"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
          >
            {categories.map((category) => (
              <button
                key={category.idCategory}
                onClick={() => handleCategoryChange(category.strCategory)}
                className={`block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 ${
                  selectedCategory === category.strCategory ? "bg-gray-200" : ""
                }`}
              >
                {category.strCategory}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredMeals.map((meal) => (
          <motion.div
            key={meal.idMeal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {meal.strMeal}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Category;
