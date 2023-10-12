import { useParams } from "react-router-dom";
import useContent from "../hooks/useContent";
import classes from "./ContentDetail.module.css";

const ContentDetail = () => {
  const { id } = useParams();
  const { content, isLoading, error } = useContent(id || "1");

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
                <img src={content.thumbnailUrl}></img>
              </div>
              <div className={classes.comment}>
                <p className={classes.commentText}>{content.comment}</p>
                <div className={classes.commentFooter}>
                  <p>{content.rating}</p>
                  <p> Posted by: {content.postedBy.username}</p>
                  <p>{content.updatedAt}</p>
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
