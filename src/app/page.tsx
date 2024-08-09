"use client";

import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { searchMealsByName } from "../api/mealAPIs";
import Category from "../components/Category";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const results = await searchMealsByName(searchQuery);
      setRecipes(results || []);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-20 px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Recipe Search
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
          <Category />
        </div>
        {loading && <p className="text-center text-white">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="recipe-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          ) : (
            <p className="text-center text-white">No recipes found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
