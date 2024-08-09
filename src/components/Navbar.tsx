import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 flex items-center justify-between z-10">
      <div className="text-2xl font-bold">Recipe Finder</div>
      <div className="space-x-4">
        <Link
          href="/about"
          className="text-lg text-gray-700 hover:text-gray-900"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-lg text-gray-700 hover:text-gray-900"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
