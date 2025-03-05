import React from "react";
import { useParams } from "react-router-dom";

function RecipePage() {
  const { id } = useParams();
  return <div>RecipePage</div>;
}

export default RecipePage;
