import { useEffect, useState } from "react";
import axios from "axios";
import "../public/styles/HabitsPage.css";

//TODO: add to be able user authorization before doing crud
//TODO: change displaying habits

function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [formHabit, setFormHabit] = useState({
    name: "",
    frequency: "daily",
    due: "",
  });
  const [editingHabitId, setEditingHabitId] = useState(null);
  const LOCAL_URL = "http://localhost:5020";

  const fetchHabits = async () => {
    try {
      const response = await axios.get(`${LOCAL_URL}/api/habit`);
      setHabits(response.data);
    } catch (err) {
      console.error("Error fetching habits:", err);
    }
  };

  const saveHabit = async (e) => {
    e.preventDefault();
    try {
      if (editingHabitId) {
        const response = await axios.put(
          `${LOCAL_URL}/api/habit/${editingHabitId}`,
          formHabit
        );
        setHabits(
          habits.map((habit) =>
            habit._id === editingHabitId ? response.data : habit
          )
        );
      } else {
        const response = await axios.post(`${LOCAL_URL}/api/habit`, formHabit);
        setHabits([...habits, response.data]);
      }
      resetForm();
    } catch (err) {
      console.error("Error saving habit:", err);
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

  const toggleComplete = async (id, currentCompleted) => {
    try {
      const response = await axios.patch(`${LOCAL_URL}/api/habit/${id}`, {
        completed: !currentCompleted,
      });
      setHabits(
        habits.map((habit) =>
          habit._id === id
            ? { ...habit, completed: response.data.completed }
            : habit
        )
      );
    } catch (err) {
      console.error("Error toggling complete:", err);
    }
  };

  const startEditing = (habit) => {
    setFormHabit({ ...habit });
    setEditingHabitId(habit._id);
  };

  const resetForm = () => {
    setFormHabit({ name: "", frequency: "daily", due: "" });
    setEditingHabitId(null);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div>
      <h1 className="habitTitle">My Habits</h1>
      <form className="habitForm" onSubmit={saveHabit}>
        <input
          className="inputHabit"
          type="text"
          placeholder="Habit Name"
          value={formHabit.name}
          onChange={(e) => setFormHabit({ ...formHabit, name: e.target.value })}
          required
        />
        <select
          className="selectHabit"
          value={formHabit.frequency}
          onChange={(e) =>
            setFormHabit({ ...formHabit, frequency: e.target.value })
          }
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          type="date"
          value={formHabit.due}
          onChange={(e) => setFormHabit({ ...formHabit, due: e.target.value })}
        />
        <button type="submit">
          {editingHabitId ? "Save Changes" : "Add Habit"}
        </button>
        {editingHabitId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>
      <ul className="habitUl">
        {habits.map((habit) => (
          <li className="habitLi" key={habit._id}>
            {habit.name} ({habit.frequency}) -{" "}
            {habit.due && new Date(habit.due).toLocaleDateString()}
            {/* <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => toggleComplete(habit._id, habit.completed)}
            /> */}
            <input className="checkbox" type="checkbox" />
            <div class="buttonContainer">
              <button onClick={() => startEditing(habit)}>Edit</button>
              <button onClick={() => deleteHabit(habit._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitsPage;
