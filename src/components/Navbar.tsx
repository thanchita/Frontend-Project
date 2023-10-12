import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className={classes.navbar}>
      <div>
        <NavLink to="/" className={classes.menu}>
          LearnHub
        </NavLink>
      </div>
      <div className={classes.menu1}>
        {isLoggedIn ? (
          <>
            <span onClick={logout}>Logout</span>
          </>
        ) : (
          <Link to="/login" className={classes.menu1}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
