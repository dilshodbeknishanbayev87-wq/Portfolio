  import React, { useState } from "react";
  import { axiosInstance } from "../request";
  import "./Post.css";

  function Post() {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [postId, setPostId] = useState(null);
    // const [navigate] = useState(null);    

    const previewUrl = image ? URL.createObjectURL(image) : "";

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!image) return alert("Rasm tanlanmagan!");

      try {
        const fd = new FormData();
        fd.append("file", image);
        const imgRes = await axiosInstance.post("/image/", fd);

        // navigate("/home");   
        const image_id = imgRes.data?.id || imgRes.data?.image_id;
        if (!image_id) return alert("image_id kelmadi!");

        const postRes = await axiosInstance.post("/posts/upload", { text, image_id });
        alert("Post qo'yildi!");  
        
        setPostId(postRes.data?.id);
      } catch {
        alert("Xatolik yuz berdi");
      }
    };

    return (
      <div className="post-wrap">
        <div className="post-card">
          <h2>New Post</h2>

          <form className="form" onSubmit={handleSubmit}>
            <input className="text"
              placeholder="Write a post..."
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />  
            <input  className="file"  type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

            {previewUrl && <img src={previewUrl} alt="preview" className="preview-img" />}

            <button className="btn" type="submit">Submit</button>
          </form>

            {postId && <Comment postId={postId} />}
        </div>
      </div>
    );
  }

  export default Post;