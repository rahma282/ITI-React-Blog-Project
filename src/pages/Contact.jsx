import React from "react";
import {
  FaPinterest,
  FaFacebook,
  FaTwitter,
  FaDribbble,
  FaBehance,
  FaLinkedin,
} from "react-icons/fa";

export default function Contact() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-lg shadow-lg">
        {/* Left Column */}
        <div>
          <h2 className="text-3xl font-bold text-[#374e6a] mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>Contact Info</h2>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Welcome to <span className="font-semibold text-[#374e6a]">MindSparks</span> —
            your cozy space for sharing thoughts, stories, and inspiration. Whether you're
            here to post your latest ideas or explore what others have shared, you're in
            the right place. Dive into a community where words matter and every post tells a story.
          </p>
          <div className="text-xl font-pacifico text-[#374e6a]" style={{ fontFamily: "'Pacifico', cursive" }}>MindSparks</div>
        </div>

        {/* Right Column */}
        <div className="bg-base-100 p-6 rounded-lg border border-base-300">
          <ul className="space-y-4 mb-6">
            <li className="flex justify-between text-gray-800">
              <span className="font-semibold text-[#374e6a]">Phone:</span>
              <span>+53 345 7953 324</span>
            </li>
            <li className="flex justify-between text-gray-800">
              <span className="font-semibold text-[#374e6a]">E-mail:</span>
              <span>MindSparks@gmail</span>
            </li>
          </ul>

          <div className="flex items-center space-x-4 text-[#374e6a] text-xl">
            <a href="https://www.pinterest.com/" className="hover:text-gray-600">
              <FaPinterest />
            </a>
            <a href="https://www.facebook.com/" className="hover:text-gray-600">
              <FaFacebook />
            </a>
            <a href="https://www.twitter.com/" className="hover:text-gray-600">
              <FaTwitter />
            </a>
            <a href="https://www.dribbble.com/" className="hover:text-gray-600">
              <FaDribbble />
            </a>
            <a href="https://www.behance.net/" className="hover:text-gray-600">
              <FaBehance />
            </a>
            <a href="https://www.linkedin.com/" className="hover:text-gray-600">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
