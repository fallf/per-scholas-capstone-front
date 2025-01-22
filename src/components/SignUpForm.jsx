import { useState } from "react";
import { FaUser } from "react-icons/fa";
import "../public/styles/loginRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const [feedbackMessage, setFeedbackMessage] = useState(""); // For feedback
  const navigate = useNavigate(); // For navigation after sign-up

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== password2) {
      setFeedbackMessage("Passwords do not match.");
      return;
    }

    try {
      // Send the signup data to the back-end API
      const response = await axios.post("http://localhost:5020/api/users", {
        name,
        email,
        password,
      });

      // If registration is successful, you can auto-login or redirect
      // (Optional: auto-login after registration)
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to the dashboard or another page
      navigate("/dashboard"); // Adjust this according to your routing
    } catch (error) {
      setFeedbackMessage("There was an error creating your account.");
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Create an account</p>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                placeholder="Enter your name"
                onChange={onChange}
              />
            </div>
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
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={formData.password2}
                placeholder="Confirm your password"
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

export default SignUpForm;
