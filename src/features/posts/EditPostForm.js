import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, selectPostById, updatePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const canUpdate =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const handleUpdate = () => {
    if (canUpdate) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to Update the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const handleDelete = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.log("Failed to delete the post", ErrorEvent);
    } finally {
      setRequestStatus("idle");
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label>Post Title:</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Author:</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label>Content</label>
        <textarea
          id="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="button"
          onClick={() => handleUpdate()}
          disabled={!canUpdate}
        >
          Save Post
        </button>
        <button type="button" onClick={() => handleDelete()}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
