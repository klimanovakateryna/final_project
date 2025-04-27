import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";
import "../styles/CreatePostForm.css";

function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const { error } = await supabase.from("posts").insert({
      title: title.trim(),
      content: content.trim(),
      image_url: imageUrl.trim(),
      upvotes: 0,
    });

    if (error) {
      console.error("Error creating post:", error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="create-post-page">
      <h2 className="create-post-title">Create a New Post</h2>
      <form className="create-post-card" onSubmit={handleSubmit}>
        <input
          type="text"
          className="create-post-input"
          placeholder="Title (required)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="create-post-textarea"
          placeholder="Content (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          className="create-post-input"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit" className="create-post-button">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePostForm;
