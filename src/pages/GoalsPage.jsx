import { useEffect, useState } from "react";
import axios from "axios";

function GoalsPage() {
  const [goal, setGoal] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    due: new Date().toISOString(), // Set current date initially
  });

  const LOCAL_URL = "http://localhost:5020";

  const getGoal = async () => {
    console.log("getGoal called");
    try {
      const response = await axios.get(`${LOCAL_URL}/api/goal`);
      console.log("Response data:", response.data);
      setGoal(response.data);
    } catch (err) {
      console.error("Error fetching goal:", err);
    }
  };

  const addGoal = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${LOCAL_URL}/api/goal`, formData);
      console.log("Goal added:", response.data);
      setGoal([...goal, response.data]);
      setFormData({
        title: "",
        description: "",
        status: "Pending",
        due: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await axios.delete(`${LOCAL_URL}/api/goal/${id}`);
      console.log("Goal deleted with ID:", id);
      setGoal(goal.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error("Error deleting goal:", err);
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
        {goal.map((entry) => {
          let formattedDate = "Invalid Date";
          if (entry.due) {
            const parsedDate = new Date(entry.due);
            if (!isNaN(parsedDate.getTime())) {
              formattedDate = parsedDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            }
          }
          console.log("Formatted Date:", formattedDate);
          return (
            <li
              key={entry._id}
              style={{ display: "block", width: "80%", color: "black" }}
            >
              <div>
                <strong>{entry.title}</strong> <br />
                {entry.description} <br />
                {entry.status} <br />
                <p>made on: {formattedDate}</p>
              </div>
              <button onClick={() => deleteGoal(entry._id)}>Delete</button>
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
      <h1>My Goals</h1>

      <div>
        <h2>Enter My Goals</h2>
        <form onSubmit={addGoal}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <br />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <br />
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="Pending">Pending</option>
            <option value="In-progress">In-progress</option>
            <option value="Completed">Completed</option>
          </select>

          <br />
          <input
            type="date"
            value={formData.due}
            onChange={(e) => setFormData({ ...formData, due: e.target.value })}
            required
          />
          <br />
          <button type="submit">Add Goal</button>
        </form>

        <div>{goal.length ? loaded() : loading()}</div>
      </div>
    </>
  );
}

export default GoalsPage;
