import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import "../public/styles/loginRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [feedbackMessage, setFeedbackMessage] = useState(""); // For user feedback
  const navigate = useNavigate(); // To navigate after successful login

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login data to the back-end API
      const response = await axios.post(
        "http://localhost:5020/api/users/login",
        {
          email,
          password,
        }
      );

      // Assuming the API returns a JWT token and user info
      const { token, user } = response.data;

      // Store the token and user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update the user state in App.js
      setUser(user.name); // Set the logged-in user's name

      // Redirect to dashboard after successful login
      navigate("/dashboard"); // Adjust this according to your routing
    } catch (error) {
      setFeedbackMessage("Invalid email or password");
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login & Set Your Life</p>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                placeholder="Enter your password"
                onChange={onChange}
              />
            </div>

            <div className="from-group">
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </div>
            {feedbackMessage && <p className="error">{feedbackMessage}</p>}
          </form>
        </section>
      </section>
    </>
  );
}

export default LoginForm;
