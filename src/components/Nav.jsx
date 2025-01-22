import { Link } from "react-router";
import { FaHome } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa";
import { FaBullseye } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";
function Nav() {
  return (
    <nav>
      <div>
        <Link to="/">
          <FaHome /> Home
        </Link>
        &nbsp; | &nbsp;
        <Link to="/budget">
          <FaPiggyBank /> Financial Plan
        </Link>
        &nbsp; | &nbsp;
        <Link to="/goals">
          <FaBullseye /> Goals
        </Link>
        &nbsp; | &nbsp;
        <Link to="/habits">
          <FaTasks /> Habits
        </Link>
        &nbsp; | &nbsp;
        <Link to="/reset">
          <FaSyncAlt /> Reset
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
