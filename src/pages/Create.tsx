import { Link } from "react-router-dom";
import classes from "./Create.module.css";

const Create = () => {
  return (
    <div className={classes.container}>
      <Link to={"/create"}>
        <button className={classes.button}>Create new content</button>
      </Link>
    </div>
  );
};
export default Create;
