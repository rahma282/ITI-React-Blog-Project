import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/posts/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error fetching posts: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        toast.error(`Failed to fetch posts: ${err.message}`);
        setLoading(false);
      });
  }, []);

  const handleDelete = (postId) => {
    const ConfirmToast = () => (
      <div>
        <p>Are you sure you want to delete this post?</p>
        <div className="flex gap-4 mt-3">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            onClick={() => {
              performDelete(postId);
              toast.dismiss();
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  
    toast(<ConfirmToast />, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });
  };
  
  const performDelete = (postId) => {
    const token = localStorage.getItem("token");
  
    fetch(`http://localhost:8000/api/posts/${postId}/`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete post");
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        toast.success("Post deleted successfully!");
      })
      .catch((err) => {
        toast.error("Delete failed: " + err.message);
      });
  };
  

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-10">
          <h1
            className="text-4xl font-semibold text-[#374e6a]"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            All Posts
          </h1>

          <button
            onClick={() => navigate("/add")}
            className="text-[#374e6a] hover:scale-110 transition"
            title="Add New Post"
          >
            <FaPlusCircle size={32} />
          </button>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts found.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition duration-200 max-w-3xl mx-auto"
              >
                <h2
                  className="text-2xl font-semibold mb-2"
                  style={{ color: "#374e6a" }}
                >
                  {post.title}
                </h2>

                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-100% rounded-md mb-4"
                    style={{ maxHeight: "300px", objectFit: "contain" }}
                  />
                )}

                <p className="text-gray-700 mb-6">{post.content}</p>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => navigate(`/edit/${post.id}`)}
                    className="hover:scale-110 transition"
                    title="Edit Post"
                  >
                    <FaEdit size={20} style={{ color: "#374e6a" }} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete Post"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
