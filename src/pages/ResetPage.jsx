import { useEffect, useState } from "react";
import axios from "axios";
import "../public/styles/ResetPage.css";
function ResetPage() {
  const [reset, setReset] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    reflectionPrompt: "",
    reflectionMonth: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Feedback state for messages
  const LOCAL_URL = "http://localhost:5020";
  const [editingId, setEditingId] = useState(null); // Track which entry is being edited

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    if (
      !formData.title ||
      !formData.category ||
      !formData.reflectionPrompt ||
      !selectedMonth
    ) {
      setFeedbackMessage("Please fill in all fields before submitting.");
      return;
    }

    const updatedFormData = {
      ...formData,
      reflectionMonth: selectedMonth,
    };

    try {
      // If editing an existing entry, send a PUT request, otherwise send POST
      if (editingId) {
        await axios.put(`${LOCAL_URL}/api/reset/${editingId}`, updatedFormData);
        setFeedbackMessage("Reflection updated successfully!");
      } else {
        await axios.post(`${LOCAL_URL}/api/reset`, updatedFormData);
        setFeedbackMessage("Reflection saved successfully!");
      }

      setFormData({
        title: "",
        category: "",
        reflectionPrompt: "",
        reflectionMonth: "",
      });
      setEditingId(null); // Reset the editing state
      getReset(); // Refresh entries after submitting
    } catch (err) {
      console.error("Error saving reflection:", err);
      setFeedbackMessage("There was an error saving your reflection.");
    }
  };

  const getReset = async () => {
    try {
      const response = await axios.get(`${LOCAL_URL}/api/reset`);
      setReset(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching reset:", err);
      setIsLoading(false);
      setFeedbackMessage("Error fetching reflections.");
    }
  };

  const handleEdit = (id) => {
    const entryToEdit = reset.find((entry) => entry._id === id);

    setFormData({
      title: entryToEdit.title,
      category: entryToEdit.category,
      reflectionPrompt: entryToEdit.reflectionPrompt,
      reflectionMonth: entryToEdit.reflectionMonth,
    });
    setEditingId(id); // Set the entry id being edited
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${LOCAL_URL}/api/reset/${id}`);
      setFeedbackMessage("Reflection deleted successfully!");
      getReset(); // Refresh entries after deletion
    } catch (err) {
      console.error("Error deleting entry:", err);
      setFeedbackMessage("There was an error deleting your reflection.");
    }
  };

  useEffect(() => {
    getReset();
  }, []);

  const loading = () => {
    return (
      <h3 className="loading-text">
        Loading your reflections... Please wait...
      </h3>
    );
  };

  const loaded = () => {
    return (
      <ul className="entry-list">
        {reset.map((entry) => (
          <li key={entry._id} className="entry-item">
            <h4>{entry.title}</h4>
            <p className="Reflec-title">
              <strong>Category:</strong> {entry.category}
            </p>
            <p className="Reflec-title">{entry.reflectionPrompt}</p>
            <p>
              <strong className="Reflec-title">Month:</strong>{" "}
              {entry.reflectionMonth}
            </p>
            <button className="edit-btn" onClick={() => handleEdit(entry._id)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(entry._id)}
            >
              &#x2716; {/* Unicode for a small cross */}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h1 className="header">Reflection</h1>
      <select
        className="month-select"
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        <option value="">Select Month</option>
        {[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <h2 className="form-header">
        {editingId ? "Edit Your Reflection" : "Create Your Reflection"}
      </h2>
      <form onSubmit={handleSubmit} className="reflection-form">
        <br />
        <label className="form-label">
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="form-input"
          >
            <option value="">Select Category</option>
            <option value="reflection">Reflection</option>
            <option value="motivation">Motivation</option>
            <option value="planning">Planning</option>
            <option value="progress">Progress</option>
          </select>
        </label>
        <br />
        <label className="form-label">
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Reflection Prompt:
          <textarea
            name="reflectionPrompt"
            value={formData.reflectionPrompt}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </label>
        <br />
        <button type="submit" className="submit-btn">
          {editingId ? "Update Reflection" : "Submit Reflection"}
        </button>
      </form>

      {feedbackMessage && (
        <div className="feedback-message">{feedbackMessage}</div>
      )}

      <h3>Your Reflections</h3>
      {isLoading ? loading() : loaded()}
    </>
  );
}

export default ResetPage;
