import { Routes, Route } from "react-router";
import { useState } from "react";
import Nav from "./components/Nav";
import BudgetPage from "./pages/BudgetPage";
import DashboardPage from "./pages/DashboardPage";
import GoalsPage from "./pages/GoalsPage";
import HabitsPage from "./pages/HabitsPage";
import ResetPage from "./pages/ResetPage";
import AutoPage from "./pages/AutoPage";
import { FiCamera } from "react-icons/fi";
import "./App.css";

function App() {
  const [user, setUser] = useState("fatou"); // Initially no user is logged in
  return (
    <>
      {user ? (
        <>
          <Nav />
          <h1 className="titlemainpage">
            The Better You <FiCamera />{" "}
          </h1>
          <h2 className="helloToTheUser">Welcome {user} 🎀</h2>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/reset" element={<ResetPage />} />
          </Routes>
        </>
      ) : (
        <AutoPage setUser={setUser} />
      )}
    </>
  );
}

export default App;
