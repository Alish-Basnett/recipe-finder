import React from "react";
import { Meal } from "../types/types";

interface RecipeCardProps {
  recipe: Meal;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">{recipe.strMeal}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
