import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialErrors = { title: null, content: null, image_url: null };

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image_url: "",
  });

  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch(`http://localhost:8000/api/posts/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch post data (status: ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setForm({
          title: data.title,
          content: data.content,
          image_url: data.image_url,
        });
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        toast.error("Error fetching post data");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(initialErrors);

    let formErrors = { ...initialErrors };

    if (!form.title) {
      formErrors.title = "Title is required";
    } else if (form.title.length < 5) {
      formErrors.title = "Title must be at least 5 characters";
    }

    if (!form.content) {
      formErrors.content = "Content is required";
    } else if (form.content.length < 10) {
      formErrors.content = "Content must be at least 10 characters";
    }

    if (!form.image_url) {
      formErrors.image_url = "Image URL is required";
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png)$/i.test(form.image_url)) {
      formErrors.image_url =
        "Image URL must be a valid image link (jpg, png, etc)";
    }

    setErrors(formErrors);

    if (!formErrors.title && !formErrors.content && !formErrors.image_url) {
      const token = localStorage.getItem("accessToken");

      fetch(`http://localhost:8000/api/posts/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(form),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to update post");
          return res.json();
        })
        .then((data) => {
          toast.success("Post updated successfully!");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((error) => {
          console.error("Update error:", error);
          toast.error("Failed to update post");
        });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="w-[500px] m-auto mt-4 bg-white p-8 shadow-xl rounded-lg border border-gray-300 mb-1">
        <h2
          className="text-2xl font-semibold text-center mb-6 text-[#374e6a]"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          Edit Your Post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 mb-4">
            <label
              htmlFor="title"
              className="text-lg font-medium text-[#374e6a]"
            >
              Title
            </label>
            <input
              value={form.title}
              onChange={handleChange}
              id="title"
              name="title"
              type="text"
              className="p-2 border border-[#374e6a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#374e6a]"
              placeholder="Enter post title"
            />
            {errors.title && (
              <span className="text-xs text-red-500 font-bold">{errors.title}</span>
            )}
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <label
              htmlFor="content"
              className="text-lg font-medium text-[#374e6a]"
            >
              Content
            </label>
            <textarea
              value={form.content}
              onChange={handleChange}
              id="content"
              name="content"
              className="p-2 border border-[#374e6a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#374e6a]"
              placeholder="Enter post content"
            />
            {errors.content && (
              <span className="text-xs text-red-500 font-bold">{errors.content}</span>
            )}
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <label
              htmlFor="image_url"
              className="text-lg font-medium text-[#374e6a]"
            >
              Image URL
            </label>
            <input
              value={form.image_url}
              onChange={handleChange}
              id="image_url"
              name="image_url"
              type="text"
              className="p-2 border border-[#374e6a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#374e6a]"
              placeholder="Paste image URL"
            />
            {errors.image_url && (
              <span className="text-xs text-red-500 font-bold">{errors.image_url}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#374e6a] text-white rounded-md hover:bg-[#2a3d55]"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Edit Post
          </button>
        </form>
      </div>
    </>
  );
}
