import { useEffect, useState } from "react";
import axios from "axios";

function HabitsPage() {
  const [habit, setHabit] = useState([]);
  const LOCAL_URL = "http://localhost:5020";

  const getHabits = async () => {
    console.log("gethabit called");
    try {
      const response = await axios.get(`${LOCAL_URL}/api/habit`);
      console.log("Response data:", response.data);
      setHabit(response.data);
      console.log("State updated:", response.data);
    } catch (err) {
      console.error("Error fetching habit:", err);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  const loaded = () => {
    console.log("Rendering loaded component with data:", habit);
    return (
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {habit.map((entry, index) => {
          console.log("Entry being rendered:", entry);
          return (
            <li
              key={entry.id || index}
              style={{ display: "block", width: "80%", color: "black" }}
            >
              {entry.name} : {entry.frequency} <br />
              {entry.status} <br /> {entry.completed} <br /> <b>{entry.due}</b>
            </li>
          );
        })}
      </ul>
    );
  };

  const loading = () => {
    console.log("Rendering loading component");
    return <h3>There doesn't seem to be a habit yet...</h3>;
  };

  return (
    <>
      <h1>My Habits</h1>
      {habit.length ? loaded() : loading()}
    </>
  );
}

export default HabitsPage;
