import React from "react";
import Categories from "../../components/Categories/Categories.js";
import RecipeCard from "../../components/RecipeCard/RecipeCard.js";
import SectionTitle from "../../components/SectionTitle/SectionTitle.js";
import { categories, recipes } from "../../data/Constants.js";

const HomePage = () => {
  return (
    <div className="min-h-screen p-6 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        ברוכים הבאים לאתר המתכונים של אורית ישמח-משה
      </h1>
      <button
        className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
        onClick={() => (window.location.href = "/ai-recipe-generator")}
      >
        אין רעיון למתכון? AI יעזור
      </button>

      <SectionTitle title="קטגוריות מובילות" />
      <Categories categories={categories} />

      <button className="bg-gray-600 text-white px-8 py-3 rounded-full mt-6 text-lg font-semibold hover:bg-gray-700 transition transform hover:scale-105">
        לכל הקטגוריות
      </button>

      <SectionTitle title="מתכונים חדשים באתר" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {recipes.slice(0, 8).map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
      <button className="bg-gray-600 text-white px-8 py-3 rounded-full mt-6 text-lg font-semibold hover:bg-gray-700 transition transform hover:scale-105">
        לכל המתכונים
      </button>
    </div>
  );
};

export default HomePage;
