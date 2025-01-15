import { useParams } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { selectAllposts } from "../posts/postsSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const posts = useSelector(selectAllposts);
  const postsByUser = posts.filter((post) => post.userId === user.id);

  const postTitles = postsByUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user.name}</h2>

      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
