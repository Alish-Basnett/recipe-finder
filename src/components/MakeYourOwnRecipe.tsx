import React, { useState } from "react";
import { filterMealsByIngredient } from "../api/mealAPIs";
import { Meal } from "../types/types";
import styles from "../styles/MakeYourOwnRecipe.module.scss";

const MakeYourOwnRecipe: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>("");
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const ingredientsArray = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());
      let filteredRecipes: Meal[] = [];

      for (const ingredient of ingredientsArray) {
        const meals = await filterMealsByIngredient(ingredient);
        filteredRecipes = [...filteredRecipes, ...meals];
      }

      const uniqueRecipes = Array.from(
        new Set(filteredRecipes.map((meal) => meal.idMeal))
      ).map((id) => filteredRecipes.find((meal) => meal.idMeal === id));

      setRecipes(uniqueRecipes as Meal[]);
    } catch (error) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["make-your-own-recipe"]}>
      <h2>Make Your Own Recipe</h2>
      <div>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas"
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.btn}>
          Search Recipes
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles["recipes-list"]}>
        {recipes.length > 0 ? (
          recipes.map((meal) => (
            <div key={meal.idMeal} className={styles["recipe-item"]}>
              <h3>{meal.strMeal}</h3>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default MakeYourOwnRecipe;
