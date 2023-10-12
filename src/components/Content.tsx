import { Link } from "react-router-dom";
import { ContentDTO } from "../types/dto";

interface IContentProps {
  content: ContentDTO;
}

const Content = ({ content }: IContentProps) => {
  return (
    <Link to={`/post/${content.id}`}>
      <div>
        <img src={content.thumbnailUrl}></img>
        <p>{content.videoTitle}</p>
        <p>{content.creatorName}</p>
        <p>{content.comment}</p>
        <p> {content.postedBy.username}</p>
        <p>{content.rating}</p>
      </div>
    </Link>
  );
};
export default Content;
