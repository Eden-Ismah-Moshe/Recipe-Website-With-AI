import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-2xl font-bold text-gray-800">{recipe.name}</h3>
      <p className="text-md text-gray-600">
        ⏳ {recipe.time} | ⭐ {recipe.level}
      </p>
      <p className="text-md mt-3 text-gray-700">{recipe.description}</p>
      <a
        href={recipe.link}
        className="text-blue-600 font-semibold mt-3 inline-block hover:underline"
      >
        למתכון המלא
      </a>
    </div>
  );
};

export default RecipeCard;
