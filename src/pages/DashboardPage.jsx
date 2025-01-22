import React, { useEffect, useState } from "react";
import axios from "axios";
import "../public/styles/DashboardPage.css";

function DashboardPage() {
  const [reset, setReset] = useState([]);
  const [habit, setHabit] = useState([]);
  const [goal, setGoal] = useState([]);
  const [budget, setBudget] = useState([]);
  const LOCAL_URL = "http://localhost:5020";
  const DEPLOY_URL = "https://best-you.onrender.com";
  const fetchData = async () => {
    try {
      const [resetResponse, habitResponse, goalResponse, budgetResponse] =
        await Promise.all([
          axios.get(`${DEPLOY_URL}/api/reset`),
          axios.get(`${DEPLOY_URL}/api/habit`),
          axios.get(`${DEPLOY_URL}/api/goal`),
          axios.get(`${DEPLOY_URL}/api/budget`),
        ]);

      setReset(resetResponse.data);
      setHabit(habitResponse.data);
      setGoal(goalResponse.data);
      setBudget(budgetResponse.data);

      console.log("Data fetched successfully");
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <section className="dashboard-section">
        <h2 className="section-title">Reset</h2>
        <div className="section-list">
          {reset.map((entry, index) => (
            <p key={entry.id || index} className="section-item">
              {entry.title} : {entry.category}
            </p>
          ))}
        </div>
      </section>
      <section className="dashboard-section">
        <h2 className="section-title">Habits</h2>
        <div className="section-list">
          {habit.map((entry, index) => (
            <p key={entry.id || index} className="section-item">
              {entry.name} : {entry.frequency}
            </p>
          ))}
        </div>
      </section>
      <section className="dashboard-section">
        <h2 className="section-title">Goals</h2>
        <div className="section-list">
          {goal.map((entry, index) => (
            <p key={entry.id || index} className="section-item">
              {entry.title} : {entry.status}
            </p>
          ))}
        </div>
      </section>
      <section className="dashboard-section">
        <h2 className="section-title">Financial Plan</h2>
        <div className="section-list">
          {budget.map((entry, index) => (
            <p key={entry.id || index} className="section-item">
              {entry.category} : {entry.amount}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
