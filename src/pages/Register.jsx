import React, { useState } from "react";
import { Link ,  useNavigate } from "react-router";


const initialErrors = { email: null, password: null,name:null,confirmPassword:null };

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name:"",
    email: "",
    password: "",
    confirmPassword:"",
  });

  const [errors, setErrors] = useState(initialErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(initialErrors);

    let formErrors = { ...initialErrors };

    if (!form.name) {
      formErrors.name = "Name is required";
    } else if (form.name.length < 3 | form.name.length > 50) {
      formErrors.name = "Name must be at least 3 characters and don't exeed 50 characters";
    }

    if (!form.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      formErrors.email = "Email is invalid";
    }
    //we need check that email is unique after i add 

    if (!form.password) {
      formErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters";
    }

    if (!form.confirmPassword) {
      formErrors.confirmPassword = "Confirm Password is required";
    } else if (form.confirmPassword !== form.password) {
      formErrors.confirmPassword = "Confirm Password must be match password";
    }

    setErrors(formErrors);

    if (!formErrors.email && !formErrors.password&& !formErrors.name && !formErrors.confirmPassword) {
      console.log("Form submitted", form);
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-[500px] m-auto mt-4 bg-white p-8 shadow-xl rounded-lg border border-gray-300 mb-1">
      <h2 className="text-2xl font-semibold text-center mb-6 text-[#374e6a]">
        Register
      </h2>
      <form onSubmit={handleSubmit}>

      <div className="flex flex-col gap-3 mb-4">
          <label htmlFor="name" className="text-lg font-medium text-[#374e6a]">
            Name
          </label>
          <input
            value={form.name}
            onChange={handleChange}
            id="name"
            name="name"
            type="text"
            className="p-2 border border-[#374e6a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#374e6a]"
            placeholder="Enter your name"
          />
          {errors.name && (
            <span className="text-xs text-red-500 font-bold">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <label htmlFor="email" className="text-lg font-medium text-[#374e6a]">
            Email
          </label>
          <input
            value={form.email}
            onChange={handleChange}
            id="email"
            name="email"
            type="text"
            className="p-2 border border-[#374e6a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#374e6a]"
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="text-xs text-red-500 font-bold">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <label
            htmlFor="password"
            className="text-lg font-medium text-[#374e6a]"
          >
            Password
          </label>
          <input
            value={form.password}
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
            className="p-2 border border-[#374e6a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#374e6a]"
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="text-xs text-red-500 font-bold">{errors.password}</span>
          )}
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <label
            htmlFor="password"
            className="text-lg font-medium text-[#374e6a]"
          >
            Confirm password
          </label>
          <input
            value={form.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="p-2 border border-[#374e6a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#374e6a]"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-500 font-bold">{errors.confirmPassword}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#374e6a] text-white rounded-md hover:bg-[#2a3d55]"
        >
          Submit
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
