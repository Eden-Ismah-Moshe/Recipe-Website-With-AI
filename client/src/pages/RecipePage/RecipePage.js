import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipe/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  return (
    <>
      <SectionTitle title={id} className="text-center" />
      <div className="text-center">
        <p className="text-lg">{recipe.description}</p>
        <p className="text-lg">Category: {recipe.category_name}</p>
        <p className="text-lg">Time: {recipe.total_time}</p>
        <p className="text-lg">Level: {recipe.difficulty_level}</p>
        <p className="text-lg">Ingredients: {recipe.ingredients}</p>
        <p className="text-lg">Instructions: {recipe.instructions}</p>
      </div>
    </>
  );
}

export default RecipePage;
