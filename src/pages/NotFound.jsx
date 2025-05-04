import React from 'react'
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-[#374e6a]">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-[#374e6a]">Page Not Found</h2>
      <p className="mt-2 text-base text-base-content/70">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded bg-[#374e6a] px-6 py-3 text-white shadow hover:bg-[#2e4058] transition"
      >
        Back to Home
      </Link>
    </div>
  </div>
  )
}
