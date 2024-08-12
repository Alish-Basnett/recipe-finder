import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          Designed and developed by: <strong>Alish Basnet</strong>
        </p>
        <p>
          API used:{" "}
          <a
            href="https://www.themealdb.com/"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            TheMealDB
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
