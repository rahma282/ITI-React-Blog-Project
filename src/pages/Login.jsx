import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // useNavigate from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialErrors = { username: null, password: null };

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initialErrors);

    let formErrors = { ...initialErrors };

    if (!form.username) {
      formErrors.username = "Username is required";
    }

    if (!form.password) {
      formErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters";
    }

    setErrors(formErrors);

    if (!formErrors.username && !formErrors.password) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/token/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const message = errorData?.detail || "Username or password is incorrect";
          toast.error(message);
          throw new Error(message);
        }

        const data = await response.json();
        console.log("Login successful, token:", data.access);
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        toast.success("Logged in successfully!");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        setErrors({ ...initialErrors, password: error.message });
        toast.error(error.message || "Login failed!");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-[500px] m-auto mt-4 bg-white p-8 shadow-xl rounded-lg border border-gray-300 mb-1">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-semibold text-center mb-6 text-[#374e6a]" style={{ fontFamily: "'Pacifico', cursive" }}>
        Login
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="flex flex-col gap-3 mb-4">
          <label htmlFor="username" className="text-lg font-medium text-[#374e6a]">Username</label>
          <input
            value={form.username}
            onChange={handleChange}
            id="username"
            name="username"
            type="text"
            className="p-2 border border-[#374e6a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#374e6a]"
            placeholder="Enter your username"
          />
          {errors.username && <span className="text-xs text-red-500 font-bold">{errors.username}</span>}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-3 mb-6">
          <label htmlFor="password" className="text-lg font-medium text-[#374e6a]">Password</label>
          <input
            value={form.password}
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
            className="p-2 border border-[#374e6a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#374e6a]"
            placeholder="Enter your password"
          />
          {errors.password && <span className="text-xs text-red-500 font-bold">{errors.password}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white rounded-md ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#374e6a] hover:bg-[#2a3d55]"
          }`}
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Register Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
