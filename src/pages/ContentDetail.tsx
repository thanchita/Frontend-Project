import { useParams } from "react-router-dom";
import useContent from "../hooks/useContent";
import classes from "./ContentDetail.module.css";
import ReactStars from "react-rating-stars-component";
import { useAuth } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const ContentDetail = () => {
  const { id } = useParams();
  const { username } = useAuth();
  const { content, isLoading, error, deleteContent } = useContent(id || "1");

  const handleDelete = () => {
    deleteContent();
  };
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        {content && (
          <>
            <div className={classes.content}>
              <div className={classes.header}>
                <h1 className={classes.title}>{content.videoTitle}</h1>
                <p className={classes.subtitle}>{content.creatorName}</p>
              </div>
              <div className={classes.video}>
                <ReactPlayer url={content.videoUrl} />
              </div>
              <div className={classes.comment}>
                <p className={classes.commentText}>{content.comment}</p>
                <div className={classes.commentFooter}>
                  <p>
                    <ReactStars
                      count={5}
                      value={content.rating}
                      size={16}
                      activeColor="#ff731d"
                      edit={false}
                    />
                  </p>
                  <p> Posted by: {content.postedBy.name}</p>
                  <p>{content.createdAt}</p>
                  <p>(Updated on {content.updatedAt})</p>

                  {username === content.postedBy.username && (
                    <Link className={classes.edit} to={`/edit/${id}`}>
                      Edit
                    </Link>
                  )}
                  {username === content.postedBy.username && (
                    <Link
                      className={classes.edit}
                      onClick={handleDelete}
                      to={`/delete/${id}`}
                    >
                      Delete
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentDetail;
