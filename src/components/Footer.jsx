import React from "react";

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p className="text-[#374e6a]">
          Copyright © {new Date().getFullYear()} - All right reserved by
          ITI-React-Project
        </p>
      </aside>
    </footer>
  );
}
