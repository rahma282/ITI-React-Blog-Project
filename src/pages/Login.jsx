import React, { useState } from "react";
import { Link , useNavigate} from "react-router";

const initialErrors = { email: null, password: null };

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(initialErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(initialErrors);

    let formErrors = { ...initialErrors };

    if (!form.email) {  
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      formErrors.email = "Email is invalid";
    }
    // else if("emil not match"){//we need check that email is right in db 
    //   formErrors.email = "Password or email is not correct";
    // }

    if (!form.password) {
      formErrors.password = "Password is required";
    } else if (form.password.length < 8) {  //not match password in db 
      formErrors.password = "Password or email is not correct";
    }

    setErrors(formErrors);

    if (!formErrors.email && !formErrors.password) {
      console.log("Form submitted", form);
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-[500px] m-auto mt-4 bg-white p-8 shadow-xl rounded-lg border border-gray-300 mb-1">
      <h2 className="text-2xl font-semibold text-center mb-6 text-[#374e6a]" style={{ fontFamily: "'Pacifico', cursive" }}>
        Login
      </h2>
      <form onSubmit={handleSubmit}>
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

        <button
          type="submit"
          className="w-full py-2 bg-[#374e6a] text-white rounded-md hover:bg-[#2a3d55]"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          Login
        </button>
      </form>

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
