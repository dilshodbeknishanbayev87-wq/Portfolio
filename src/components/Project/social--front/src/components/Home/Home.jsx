import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { axiosInstance } from "../request";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPostUser, setSelectedPostUser] = useState("");

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const handleShowPosts = async () => {
    try {
      const res = await axiosInstance.get("/posts");
      setPosts(Array.isArray(res.data) ? res.data : res.data?.posts || []);
    } catch (err) {
      console.error("Postlarni olishda xatolik:", err);
    }
  };

  useEffect(() => {   
    const fetchUser = async () => {
      const username = localStorage.getItem("username");
      try {
        const res = await axiosInstance.get("/auth/user", { params: { username } });
        setUser(res.data);
      } catch (err) {
        console.error("User olishda xatolik:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const justLoggedIn = localStorage.getItem("justLoggedIn");

      if (justLoggedIn === "true") {
        await handleShowPosts();
        localStorage.removeItem("justLoggedIn");
      }
    };

    fetchData();
  }, []);

  const handleLikeToggle = async (postId) => {
    try {
      await axiosInstance.post("/posts/like", { post_id: postId });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                has_liked: !p.has_liked,
                likes: p.has_liked
                  ? Math.max((p.likes ?? 1) - 1, 0)
                  : (p.likes ?? 0) + 1,
              }
            : p
        )
      );
    } catch (err) {
      console.error("Like xatolik:", err);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await axiosInstance.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Comment olishda xatolik:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await axiosInstance.post("/comments", {
        content: commentText,
        post_id: selectedPostId,
      });

      setComments((prev) => [
        ...prev,
        { id: res.data.id || Date.now(), content: commentText, this_user: true },
      ]);
      setCommentText("");
    } catch (err) {
      console.error("Comment qo‘shishda xatolik:", err);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axiosInstance.delete(`/comments/${id}`);
      setComments((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("O‘chirishda xatolik:", err);
    }
  };

  return (
    <div className="container">
      <div className="menu">
        <h2>Menu</h2>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </div>

      <div className="content">
        {user && <div className="user-info"><h2>{user.username}</h2></div>}

        <button className="btn-pro" onClick={handleShowPosts}>More</button>

        <div className="posts">
          {posts.map((p) => (
            <div className="postCard" key={p.id}>
              <div className="postTop">
                <img
                  className="avatar"
                  src={
                    p.user_image  || "https://cdn-icons-png.flaticon.com/512/149/149071.png"  
                  }
                  alt="avatar"
                />
                <b>{p.username || "User"}</b>
                <span className="date">
                  {p.createdAt ? new Date(p.createdAt).toLocaleString() : ""}
                </span>
              </div>

              <p className="desc">{p.text || ""}</p>

              {(p.image || p.user_image) && (
                <img className="postImg" src={p.image || p.user_image} alt="post" />
              )}

              <div className="postBottom">
                <button className="like-btn" onClick={() => handleLikeToggle(p.id)}>
                  {p.has_liked ? "❤️" : "🤍"} {p.likes ?? 0}
                </button>

                <span>💬 {Array.isArray(p.comments) ? p.comments.length : p.comments ?? 0}</span>

                <button
                  className="comment-btn"
                  onClick={() => {
                    setSelectedPostId(p.id);
                    setSelectedPostUser(p.username || "User");
                    fetchComments(p.id);
                  }}
                >
                  Comments
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPostId && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Comments for {selectedPostUser}</h3>

              <form onSubmit={handleAddComment} className="comment-form">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Izoh yozing..."
                />
                <button type="submit">Qo'shish</button>
              </form>

              <ul className="comment-list">
                {comments.map((p) => (
                  <li key={p.id}>
                    {p.content}
                    {p.this_user && (
                      <button onClick={() => handleDeleteComment(p.id)}>
                        O‘chirish
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              <button onClick={() => setSelectedPostId(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;