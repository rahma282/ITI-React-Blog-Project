import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const initialErrors = { title: null, body: null, image: null };

export default function AddPost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    body: "",
    image: "",
  });

  const [errors, setErrors] = useState(initialErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(initialErrors);

    let formErrors = { ...initialErrors };

    if (!form.title) {
      formErrors.title = "Title is required";
    } else if (form.title.length < 5) {
      formErrors.title = "Title must be at least 5 characters";
    }

    if (!form.body) {
      formErrors.body = "body is required";
    } else if (form.body.length < 10) {
      //not match body in db
      formErrors.body = "body or must be at least 10 characters";
    }

    if (!form.image) {
      formErrors.image = "Image URL is required";
    } else if (
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(form.image)
    ) {
      formErrors.image = "Image URL must be a valid image link (jpg, png, etc)";
    }
    setErrors(formErrors);

    if (!formErrors.title && !formErrors.body && !formErrors.image) {
      console.log("Form submitted", form);
      navigate("/");
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
          <label htmlFor="body" className="text-lg font-medium text-[#374e6a]">
            body
          </label>
          <textarea
            value={form.body}
            onChange={handleChange}
            id="body"
            name="body"
            type="text"
            className="p-2 border border-[#374e6a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#374e6a]"
            placeholder="Enter post body"
          />
          {errors.body && (
            <span className="text-xs text-red-500 font-bold">
              {errors.body}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <label htmlFor="image" className="text-lg font-medium text-[#374e6a]">
            Image URL
          </label>
          <input
            value={form.image}
            onChange={handleChange}
            id="image"
            name="image"
            type="text"
            className="p-2 border border-[#374e6a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#374e6a]"
            placeholder="Paste image URL"
          />
          {errors.image && (
            <span className="text-xs text-red-500 font-bold">
              {errors.image}
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
