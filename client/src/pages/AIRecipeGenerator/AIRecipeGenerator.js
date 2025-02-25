import React, { useState } from "react";
import axios from "axios";

const AIRecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("בוקר");
  const [time, setTime] = useState("");
  const [recipe, setRecipe] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/generate-recipe",
        {
          ingredients,
          mealType,
          time,
        }
      );
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  };

  return (
    <div>
      <h2>AI Recipe Generator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>רכיבים:</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>סוג הארוחה:</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            required
            className="border p-2 rounded-md w-full"
          >
            <option value="בוקר">בוקר</option>
            <option value="צהריים">צהריים</option>
            <option value="ערב">ערב</option>
          </select>
        </div>
        <div>
          <label>זמן (בדקות):</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="border p-2 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Generate Recipe
        </button>
      </form>

      {recipe && (
        <div>
          <h3>Generated Recipe:</h3>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
};

export default AIRecipeGenerator;
