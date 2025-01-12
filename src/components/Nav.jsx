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
      <div>Sign Out</div>
    </nav>
  );
}

export default Nav;
