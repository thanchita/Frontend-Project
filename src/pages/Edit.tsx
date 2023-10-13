import classes from "./Edit.module.css";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import useContent from "../hooks/useContent";
import ReactStars from "react-rating-stars-component";

const Edit = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const { id } = useParams();
  const { editContent } = useContent(id || "1");

  if (!isLoggedIn) {
    return "Cannot edit content. Access denied.";
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("edit");
    try {
      await editContent(newComment, rating);

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
      <form onSubmit={handleSubmit}>
        <h1 className={classes.title}>Edit content</h1>
        <div className={classes.form}>
          <div className={classes.form1}>
            <label className={classes.label}>
              Comment (280 characters maximum)
            </label>
            <input
              className={classes.input}
              type="text"
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
          <div className={classes.rating}>
            <label className={classes.label}>Rating</label>
            <ReactStars
              count={5}
              value={rating}
              onChange={ratingChanged}
              size={24}
              activeColor="#ff731d"
            />
          </div>

          <input className={classes.button} type="submit" value="Edit" />
        </div>
      </form>
    </div>
  );
};
export default Edit;
