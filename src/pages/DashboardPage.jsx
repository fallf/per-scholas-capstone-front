import React, { useEffect, useState } from "react";
import axios from "axios";

function DashboardPage() {
  const [reset, setReset] = useState([]);
  const [habit, setHabit] = useState([]);
  const [goal, setGoal] = useState([]);
  const [budget, setBudget] = useState([]);
  const LOCAL_URL = "http://localhost:5020";

  const fetchData = async () => {
    try {
      const [resetResponse, habitResponse, goalResponse, budgetResponse] =
        await Promise.all([
          axios.get(`${LOCAL_URL}/api/reset`),
          axios.get(`${LOCAL_URL}/api/habit`),
          axios.get(`${LOCAL_URL}/api/goal`),
          axios.get(`${LOCAL_URL}/api/budget`),
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
    <div>
      <h1>Dashboard</h1>
      <section>
        <h2>Reset</h2>
        <ul>
          {reset.map((entry, index) => (
            <li key={entry.id || index}>
              {entry.title} : {entry.category}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Habits</h2>
        <ul>
          {habit.map((entry, index) => (
            <li key={entry.id || index}>
              {entry.name} : {entry.frequency}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Goals</h2>
        <ul>
          {goal.map((entry, index) => (
            <li key={entry.id || index}>
              {entry.title} : {entry.status}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Budget</h2>
        <ul>
          {budget.map((entry, index) => (
            <li key={entry.id || index}>
              {entry.category} : {entry.amount}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default DashboardPage;
