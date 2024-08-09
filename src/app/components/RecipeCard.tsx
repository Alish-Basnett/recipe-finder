import React from "react";

interface RecipeCardProps {
  recipe: any; // You can replace `any` with a proper type
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => (
  <div key={recipe.idMeal} className="card p-4 border rounded-lg">
    <img
      src={recipe.strMealThumb}
      alt={recipe.strMeal}
      className="rounded-lg mb-4"
    />
    <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
  </div>
);

export default RecipeCard;
