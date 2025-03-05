import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AIRecipeGenerator from "./pages/AIRecipeGenerator/AIRecipeGenerator";
import RecipesPage from "./pages/RecipesPage/RecipesPage";
import RecipePage from "./pages/RecipePage/RecipePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ai-recipe-generator" element={<AIRecipeGenerator />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/:category" element={<RecipesPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  );
}
export default App;
