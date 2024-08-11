"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { searchMealsByName } from "../api/mealAPIs";
import Category from "../components/Category";
import Navbar from "../components/Navbar";
import { Modal, Button } from "antd";
import MakeYourOwnRecipe from "@/components/MakeYourOwnRecipe";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-fixed bg-cover bg-center animate-gradient">
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

        {/* "Make Your Own Recipe" Button */}
        <div className="flex justify-center mt-16">
          <Button
            type="primary"
            onClick={showModal}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-300"
          >
            Make Your Own Recipe
          </Button>
        </div>
      </main>

      {/* Modal for "Make Your Own Recipe" */}
      <Modal
        title="Create Your Own Recipe"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <MakeYourOwnRecipe />
      </Modal>
    </div>
  );
};

export default Home;
