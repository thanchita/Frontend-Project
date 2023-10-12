import classes from "./Create.module.css";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import useContents from "../hooks/useContents";
import ReactStars from "react-rating-stars-component";

const Create = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [videoUrl, setvideoUrl] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const { createContent } = useContents();

  if (!isLoggedIn) {
    return "Cannot create content. Access denied.";
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("create");
    try {
      await createContent(videoUrl, comment, rating);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const ratingChanged = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className={classes.container}>
      <form className={classes.loginForm} onSubmit={handleSubmit}>
        <h1 className={classes.title}>Create new content</h1>
        <div className={classes.form}>
          <div className={classes.form1}>
            <label className={classes.label}>Video URL</label>
            <input
              className={classes.input}
              type="text"
              onChange={(e) => setvideoUrl(e.target.value)}
            />
          </div>
          <div className={classes.form1}>
            <label className={classes.label}>
              Comment (280 characters maximum)
            </label>
            <input
              className={classes.input}
              type="text"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className={classes.form1}>
            <label className={classes.label}>Rating</label>
            <ReactStars
              count={5}
              value={rating}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
          </div>

          <input className={classes.button} type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
};
export default Create;
