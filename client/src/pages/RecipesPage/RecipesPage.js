import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard.js";
import SectionTitle from "../../components/SectionTitle/SectionTitle.js";

import { recipes as tempRecipes } from "../../data/Constants.js";

function RecipesPage() {
  const { category } = useParams();
  const [recipes, setRecipes] = useState(tempRecipes);
  /*
  useEffect(() => {
       const fetchRecipes = async () => {
           try {
               const response = await axios.get(`http://localhost:5000/recipes?category=${category}`);
               setRecipes(response.data);
           } catch (error) {
               console.error("Error fetching recipes:", error);
           }
       };
       fetchRecipes();
   }, [category]);
*/

  return (
    <>
      <div>
        {category ? (
          <SectionTitle title={category} />
        ) : (
          <SectionTitle title="כל המתכונים" />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </>
  );
}

export default RecipesPage;
