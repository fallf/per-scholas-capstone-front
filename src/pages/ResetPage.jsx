import { useEffect, useState } from "react";
import axios from "axios";

function ResetPage() {
  const [reset, setReset] = useState([]);
  const LOCAL_URL = "http://localhost:5020";

  const getReset = async () => {
    console.log("getREset called");
    try {
      const response = await axios.get(`${LOCAL_URL}/api/reset`);
      console.log("Response data:", response.data);
      setReset(response.data);
      console.log("State updated:", response.data);
    } catch (err) {
      console.error("Error fetching reset:", err);
    }
  };

  useEffect(() => {
    getReset();
  }, []);

  const loaded = () => {
    console.log("Rendering loaded component with data:", reset);
    return (
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {reset.map((entry, index) => {
          console.log("Entry being rendered:", entry);
          return (
            <li
              key={entry.id || index}
              style={{ display: "block", width: "80%", color: "black" }}
            >
              {entry.title} : {entry.category} <br />
              {entry.reflectionPrompt}
            </li>
          );
        })}
      </ul>
    );
  };

  const loading = () => {
    console.log("Rendering loading component");
    return <h3>There doesn't seem to be a reset yet...</h3>;
  };

  return (
    <>
      <h1>Reflection</h1>
      {reset.length ? loaded() : loading()}
    </>
  );
}

export default ResetPage;
