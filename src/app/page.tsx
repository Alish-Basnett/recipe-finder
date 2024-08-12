"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import MakeYourOwnRecipe from "../components/MakeYourOwnRecipe";
import RecipeDetail from "../components/RecipeDetails";
import {
  searchMealsByName,
  getMealsByCategory,
  lookupMealById,
} from "../api/mealAPIs";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [myOwnRecipeQuery, setMyOwnRecipeQuery] = useState("");
  const [searchRecipes, setSearchRecipes] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<any | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("1"); // Default to "All"

  const fetchAllRecipes = async () => {
    setSearchLoading(true);
    setSearchError(null);

    try {
      const results = await searchMealsByName(""); // Fetch all recipes
      setSearchRecipes(results || []);
    } catch (err) {
      setSearchError("Failed to fetch recipes. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = async () => {
    setSearchLoading(true);
    setSearchError(null);
    setHasSearched(true);

    try {
      setMyOwnRecipeQuery(""); // Clear MakeYourOwnRecipe search query
      const results = await searchMealsByName(searchQuery);
      setSearchRecipes(results || []);
    } catch (err) {
      setSearchError("Failed to fetch recipes. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleMyOwnRecipeSearch = async () => {
    setSearchLoading(true);
    setSearchError(null);
    setHasSearched(true);

    try {
      setSearchQuery(""); // Clear SearchBar search query
      const results = await searchMealsByName(myOwnRecipeQuery);
      setSearchRecipes(results || []);
    } catch (err) {
      setSearchError("Failed to fetch recipes. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    setSearchLoading(true);

    try {
      if (category === "1") {
        await fetchAllRecipes(); // Fetch all recipes
      } else {
        const results = await getMealsByCategory(category);
        console.log(results);
        setSearchRecipes(results || []);
      }
    } catch (err) {
      setSearchError("Failed to fetch recipes. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRecipeClick = async (meal: any) => {
    try {
      const fullMealDetails = await lookupMealById(meal.idMeal); // Fetch full details
      setSelectedMeal(fullMealDetails);
      setShowDetail(true);
    } catch (err) {
      console.error("Failed to fetch meal details", err);
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedMeal(null);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await response.json();
        setCategories(data.categories.map((cat: any) => cat.strCategory));
        await fetchAllRecipes(); // Fetch all recipes by default
      } catch (err) {
        setSearchError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        {/* Centering Container */}
        <div className="flex flex-col items-center mb-6 space-y-6">
          <div className="w-full max-w-4xl">
            <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
              Recipe Search
            </h1>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
          </div>
          <div className="w-full max-w-4xl">
            <MakeYourOwnRecipe
              recipes={searchRecipes}
              searchQuery={myOwnRecipeQuery}
              setSearchQuery={setMyOwnRecipeQuery}
              handleSearch={handleMyOwnRecipeSearch}
            />
          </div>
        </div>

        <div className="mb-6">
          <div
            className="overflow-x-auto whitespace-nowrap flex items-center space-x-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg border border-gray-300 
                  text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors 
                  duration-300 ease-in-out ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
            <button
              key="1"
              className={`px-4 py-2 rounded-lg border border-gray-300 
                text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors 
                duration-300 ease-in-out ${
                  selectedCategory === "1" ? "bg-blue-500 text-white" : ""
                }`}
              onClick={() => handleCategoryChange("1")}
            >
              All
            </button>
          </div>

          {/* Loading indicator */}
          {searchLoading && (
            <div className="flex justify-center items-center mt-8">
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}

          {/* Recipe cards */}
          <div
            className={`recipe-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 transition-opacity duration-300 ${
              searchLoading ? "opacity-50" : "opacity-100"
            }`}
          >
            {searchRecipes.map((meal: any) => (
              <RecipeCard
                key={meal.idMeal}
                recipe={meal}
                onClick={() => handleRecipeClick(meal)}
              />
            ))}
          </div>
        </div>

        {showDetail && selectedMeal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <RecipeDetail meal={selectedMeal} onClose={handleCloseDetail} />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Home;
