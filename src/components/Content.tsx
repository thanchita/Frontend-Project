import { Link } from "react-router-dom";
import { ContentDTO } from "../types/dto";
import classes from "./Content.module.css";
import ReactStars from "react-rating-stars-component";

interface IContentProps {
  content: ContentDTO;
}

const Content = ({ content }: IContentProps) => {
  return (
    <Link className={classes.cardd} to={`/content/${content.id}`}>
      <div className={classes.card}>
        <img src={content.thumbnailUrl} className={classes.thumbnail}></img>
        <div className={classes.detail}>
          <div className={classes.detailGroup}>
            <div className={classes.titleGroup}>
              <p className={classes.title}>{content.videoTitle}</p>
              <p className={classes.creator}>{content.creatorName}</p>
            </div>

            <p className={classes.comment}>{content.comment}</p>
          </div>
          <div className={classes.detailRow}>
            <p> {content.postedBy.name}</p>
            <p>
              <ReactStars
                count={5}
                value={content.rating}
                size={16}
                activeColor="palevioletred"
                edit={false}
              />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Content;
