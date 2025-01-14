import { useEffect, useState } from "react";
import axios from "axios";

function GoalsPage() {
  const [goal, setGoal] = useState([]);
  const LOCAL_URL = "http://localhost:5020";

  const getGoal = async () => {
    console.log("getGoal called");
    try {
      const response = await axios.get(`${LOCAL_URL}/api/goal`);
      console.log("Response data:", response.data);
      setGoal(response.data);
      console.log("State updated:", response.data);
    } catch (err) {
      console.error("Error fetching goal:", err);
    }
  };

  useEffect(() => {
    getGoal();
  }, []);

  const loaded = () => {
    console.log("Rendering loaded component with data:", goal);
    return (
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {goal.map((entry, index) => {
          console.log("Entry being rendered:", entry);
          return (
            <li
              key={entry.id || index}
              style={{ display: "block", width: "80%", color: "black" }}
            >
              {entry.title} <br />
              {entry.description} <br /> {entry.status} <br />
              <b>{entry.due}</b>
            </li>
          );
        })}
      </ul>
    );
  };

  const loading = () => {
    console.log("Rendering loading component");
    return <h3>There doesn't seem to be a goal yet...</h3>;
  };

  return (
    <>
      <h1>My goals</h1>
      {goal.length ? loaded() : loading()}
    </>
  );
}

export default GoalsPage;
