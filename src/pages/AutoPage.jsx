import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

function AutoPage(props) {
  const [signup, setSignup] = useState(true);

  function togglePage() {
    setSignup(!signup);
  }

  return (
    <>
      <h1> Register or Log in</h1>
      <>
        {signup ? (
          <SignUpForm setUser={props.setUser} />
        ) : (
          <LoginForm setUser={props.setUser} />
        )}
      </>
      <h3> {signup ? "Log In" : "Register"}</h3>
      <button
        onClick={togglePage}
        style={{
          padding: "10px 20px",
          border: "2px solid #ff61a6",
          borderRadius: "8px",
          backgroundColor: signup ? "#ff85b3" : "#ff61a6",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        {signup ? "Log In" : "Register"}
      </button>
    </>
  );
}

export default AutoPage;
