import { Link } from "react-router-dom";
import Content from "../components/Content";
import useContents from "../hooks/useContents";
import classes from "./Home.module.css";
import { useAuth } from "../providers/AuthProvider";

const Home = () => {
  const { contents } = useContents();
  const { isLoggedIn } = useAuth();
  return (
    <div className={classes.banner}>
      <h2 className={classes.feedContainer}>LearnHub</h2>
      <h2 className={classes.subtitle}>Hub for Educational Videos</h2>
      <div className={classes.container}>
        {isLoggedIn && (
          <Link to={"/create"}>
            <button className={classes.button}>Create new content</button>
          </Link>
        )}
      </div>
      <div className={classes.container1}>
        {contents &&
          contents.map((content) => {
            return <Content key={content.id} content={content} />;
          })}
      </div>
    </div>
  );
};

export default Home;
