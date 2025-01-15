import { useParams, Link } from "react-router-dom";
import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) return <p>Post Not Found!</p>;

  return (
    <>
      <article>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p className="postCredit">
          <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
          <PostAuthor post={post} />
          <TimeAgo timeStamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    </>
  );
};

export default SinglePostPage;
