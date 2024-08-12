import React from "react";
import { Meal } from "../types/types";
import { FaTimes } from "react-icons/fa";

interface RecipeDetailProps {
  meal: Meal;
  onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ meal, onClose }) => {
  // Function to split instructions into individual steps
  const getInstructionsSteps = () => {
    if (!meal.strInstructions) return [];
    return meal.strInstructions
      .split(/\r?\n/)
      .filter((step) => step.trim() !== "");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-7xl h-[80vh] flex rounded-lg shadow-lg overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors duration-300"
        >
          <FaTimes className="w-8 h-8" />
        </button>
        <div className="w-2/3 h-full flex-shrink-0">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover border-r border-gray-200"
          />
        </div>
        <div className="w-2/3 p-6 overflow-y-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {meal.strMeal}
          </h2>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Ingredients
            </h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              {Object.keys(meal)
                .filter((key) => key.startsWith("strIngredient") && meal[key])
                .map((key, index) => (
                  <li key={index} className="flex items-center">
                    <span className="font-medium">{meal[key]}</span>
                    <span className="ml-2 text-gray-600">
                      {meal[`strMeasure${key.slice(13)}`]}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Instructions
            </h3>
            <ol className="list-decimal pl-5 text-gray-700 space-y-2">
              {getInstructionsSteps().map((step, index) => (
                <li key={index} className="text-gray-700 leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
