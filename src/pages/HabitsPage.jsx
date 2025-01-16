import { useEffect, useState } from "react";
import axios from "axios";

function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({
    name: "",
    frequency: "daily",
    due: "",
  });
  const LOCAL_URL = "http://localhost:5020";

  const fetchHabits = async () => {
    try {
      const response = await axios.get(`${LOCAL_URL}/api/habit`);
      setHabits(response.data);
    } catch (err) {
      console.error("Error fetching habits:", err);
    }
  };

  const addHabit = async () => {
    try {
      const response = await axios.post(`${LOCAL_URL}/api/habit`, newHabit);
      setHabits([...habits, response.data]);
      setNewHabit({ name: "", frequency: "daily", due: "" });
    } catch (err) {
      console.error("Error adding habit:", err);
    }
  };

  const deleteHabit = async (id) => {
    try {
      await axios.delete(`${LOCAL_URL}/api/habit/${id}`);
      setHabits(habits.filter((habit) => habit._id !== id));
    } catch (err) {
      console.error("Error deleting habit:", err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.patch(`${LOCAL_URL}/api/habit/${id}`, {
        completed: !completed,
      });
      setHabits(
        habits.map((habit) => (habit._id === id ? response.data : habit))
      );
    } catch (err) {
      console.error("Error updating habit:", err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div>
      <h1>My Habits</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addHabit();
        }}
      >
        <input
          type="text"
          placeholder="Habit Name"
          value={newHabit.name}
          onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
          required
        />
        <select
          value={newHabit.frequency}
          onChange={(e) =>
            setNewHabit({ ...newHabit, frequency: e.target.value })
          }
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          type="date"
          value={newHabit.due}
          onChange={(e) => setNewHabit({ ...newHabit, due: e.target.value })}
        />
        <button type="submit">Add Habit</button>
      </form>
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            {habit.name} ({habit.frequency}) -{" "}
            {habit.due && new Date(habit.due).toLocaleDateString()}
            <button onClick={() => toggleComplete(habit._id, habit.completed)}>
              {habit.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => deleteHabit(habit._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitsPage;
