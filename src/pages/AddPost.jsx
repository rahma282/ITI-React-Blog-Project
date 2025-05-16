import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const initialErrors = { title: null, content: null, image_url: null };

export default function AddPost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",    
    image_url: "",  
  });

  const [errors, setErrors] = useState(initialErrors);

  const handleSubmit = async (e) => {
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
    } else if (
      !/^https?:\/\/.+\.(jpg|jpeg|png)$/i.test(form.image_url)
    ) {
      formErrors.image_url = "Image URL must be a valid image link (jpg, png, etc)";
    }
    setErrors(formErrors);

    if (!formErrors.title && !formErrors.content && !formErrors.image_url) {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token); // Log the token
        
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        console.log("Request configuration:", {
          url: "http://localhost:8000/api/posts/",
          method: "POST",
          data: form,
          headers: config.headers,
        });

        const response = await axios.post(
          "http://localhost:8000/api/posts/", 
          form, 
          config
        );

        console.log("Response received:", {
          status: response.status,
          data: response.data,
          headers: response.headers,
        });

        console.log("Post submitted successfully");
        navigate("/");
      } catch (error) {
        console.error("Full error object:", error);
        
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Response error details:", {
            status: error.response.status,
            headers: error.response.headers,
            data: error.response.data,
          });
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Request setup error:", error.message);
        }
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-[500px] m-auto mt-4 bg-white p-8 shadow-xl rounded-lg border border-gray-300 mb-1">
      <h2
        className="text-2xl font-semibold text-center mb-6 text-[#374e6a]"
        style={{ fontFamily: "'Pacifico', cursive" }}
      >
        Add Post
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 mb-4">
          <label htmlFor="title" className="text-lg font-medium text-[#374e6a]">
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
            <span className="text-xs text-red-500 font-bold">
              {errors.title}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <label htmlFor="content" className="text-lg font-medium text-[#374e6a]">
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
            <span className="text-xs text-red-500 font-bold">
              {errors.content}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <label htmlFor="image_url" className="text-lg font-medium text-[#374e6a]">
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
            <span className="text-xs text-red-500 font-bold">
              {errors.image_url}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#374e6a] text-white rounded-md hover:bg-[#2a3d55]"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          Create Post
        </button>
      </form>
    </div>
  );
}