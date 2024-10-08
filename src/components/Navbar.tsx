import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-4 px-6 bg-transparent z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-2xl font-bold">Recipe Finder</div>
        <div className="flex space-x-6 text-white">
          <a href="#" className="hover:text-blue text-black">
            About
          </a>
          <a href="#" className="hover:text-blue text-black">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
