import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AIRecipeGenerator from "./pages/AIRecipeGenerator/AIRecipeGenerator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ai-recipe-generator" element={<AIRecipeGenerator />} />
      </Routes>
    </Router>
  );
}
export default App;
