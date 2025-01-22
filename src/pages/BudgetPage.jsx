import { useEffect, useState } from "react";
import axios from "axios";

function BudgetPage() {
  const [budget, setBudget] = useState([]);
  const LOCAL_URL = "http://localhost:5020";
  const DEPLOY_URL = "https://best-you.onrender.com";

  const getBudget = async () => {
    console.log("getBudget called");
    try {
      const response = await axios.get(`${DEPLOY_URL}/api/budget`);
      console.log("Response data:", response.data);
      setBudget(response.data);
      console.log("State updated:", response.data);
    } catch (err) {
      console.error("Error fetching budget:", err);
    }
  };

  useEffect(() => {
    getBudget();
  }, []);

  const loaded = () => {
    console.log("Rendering loaded component with data:", budget);
    return (
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {budget.map((entry, index) => {
          console.log("Entry being rendered:", entry);
          return (
            <li
              key={entry.id || index}
              style={{ display: "block", width: "80%", color: "black" }}
            >
              {entry.category} : {entry.amount} <br />
              {entry.description} <br /> {entry.status} <br />{" "}
              <b>{entry.entryDate}</b>
            </li>
          );
        })}
      </ul>
    );
  };

  const loading = () => {
    console.log("Rendering loading component");
    return <h3>There doesn't seem to be a budget yet...</h3>;
  };

  return (
    <>
      <h1>Financial Plan</h1>
      {budget.length ? loaded() : loading()}
    </>
  );
}

export default BudgetPage;
