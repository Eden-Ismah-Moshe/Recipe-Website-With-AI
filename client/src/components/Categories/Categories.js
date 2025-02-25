import React from "react";

const Categories = ({ categories }) => {
  return (
    <div className="flex justify-center gap-8 flex-wrap">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center transform hover:scale-105 transition"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-28 h-28 rounded-full shadow-lg border-4 border-gray-300"
          />
          <span className="mt-3 text-lg font-semibold text-gray-800">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
