import { Routes, Route } from "react-router";
import { useState } from "react";
import Nav from "./components/Nav";
import BudgetPage from "./pages/BudgetPage";
import DashboardPage from "./pages/DashboardPage";
import GoalsPage from "./pages/GoalsPage";
import HabitsPage from "./pages/HabitsPage";
import ResetPage from "./pages/ResetPage"; // Import only once
import AutoPage from "./pages/AutoPage";
import "./App.css";

function App() {
  const [user, setUser] = useState("fatou");
  return (
    <>
      {user ? (
        <>
          <Nav />
          <h1 className="titlemainpage">Best version of you</h1>
          <h2 className="helloToTheUser">Hi {user}</h2>
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
