import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddMealplan from "./pages/AddMealplan";
import Meallist from "./pages/Meallist";
import MealUpdate from "./pages/MealUpdate";
import ShareMeal from "./pages/ShareMeal";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/Addmeal" element={<AddMealplan />} />
        <Route path="/meallist" element={<Meallist />} />
        <Route path="/mealplan/:mealId" element={<MealUpdate />} />
        <Route path="/share/:ShareId" element={<ShareMeal />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
