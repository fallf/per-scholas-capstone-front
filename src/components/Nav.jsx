import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

import { Link } from "react-router";

function Nav() {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        &nbsp; | &nbsp;
        <Link to="/budget">Financial Plan</Link>
        &nbsp; | &nbsp;
        <Link to="/goals">Goals</Link>
        &nbsp; | &nbsp;
        <Link to="/habits">Habits</Link>
        &nbsp; | &nbsp;
        <Link to="/reset">Reset</Link>
      </div>
      <div>
        {" "}
        <ul>
          <li>
            <Link to="/Autopage">
              Login
              <FaSignInAlt />
            </Link>
          </li>
          <li>
            <Link to="/register">
              Register
              <FaUser />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
