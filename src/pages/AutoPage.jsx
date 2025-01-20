import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

function AutoPage() {
  const [signup, setSignup] = useState(true);

  function togglePage() {
    setSignup(!signup);
  }
  return (
    <>
      <h1> Register or Log in</h1>
      <>{signup ? <SignUpForm /> : <LoginForm />}</>
      <button onClick={togglePage}>{signup ? "Log In" : "Register"} </button>
    </>
  );
}

export default AutoPage;
