import { useEffect, useState } from "react";
import axios from "axios";

import "../public/styles/GoalsPage.css";

function GoalsPage() {
  const [goal, setGoal] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    due: "", // Allow user input for due date
  });

  const LOCAL_URL = "http://localhost:5020";
  const DEPLOY_URL = "https://best-you.onrender.com";
  const getGoal = async () => {
    console.log("getGoal called");
    try {
      const response = await axios.get(`${DEPLOY_URL}/api/goal`);
      console.log("Response data:", response.data);
      setGoal(response.data);
    } catch (err) {
      console.error("Error fetching goal:", err);
    }
  };

  const addGoal = async (event) => {
    event.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      const response = await axios.post(`${DEPLOY_URL}/api/goal`, formData);
      console.log("Goal added:", response.data);
      setGoal([...goal, response.data]);
      setFormData({ title: "", description: "", status: "Pending", due: "" });
    } catch (err) {
      console.error("Error adding goal:", err.response?.data || err.message);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await axios.delete(`${DEPLOY_URL}/api/goal/${id}`);
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
      <div className="goal-list">
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
            <p key={entry._id} className="goal-item">
              <div>
                <h2>{entry.title}</h2>
                <br />
                {entry.description} <br />
                <p>
                  <b>Status:</b> {entry.status}
                </p>{" "}
                <p>
                  <b>Accomplish by:</b> {formattedDate}
                </p>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteGoal(entry._id)}
              >
                Delete
              </button>
            </p>
          );
        })}
      </div>
    );
  };

  const loading = () => {
    console.log("Rendering loading component");
    return (
      <h3 className="loading-text">There doesn't seem to be a goal yet...</h3>
    );
  };

  return (
    <>
      <h1 className="page-title">My Goals</h1>

      <div className="form-container">
        <h2 className="form-title">Enter My Goals</h2>
        <form className="goal-form" onSubmit={addGoal}>
          <input
            type="text"
            className="goal-input"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <br />
          <textarea
            className="goal-textarea"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <br />
          <select
            className="goal-select"
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
            className="goal-date"
            value={formData.due}
            onChange={(e) => setFormData({ ...formData, due: e.target.value })}
            required
          />
          <br />
          <button type="submit" className="submit-btn">
            Add Goal
          </button>
        </form>

        <div>{goal.length ? loaded() : loading()}</div>
      </div>
    </>
  );
}

export default GoalsPage;
