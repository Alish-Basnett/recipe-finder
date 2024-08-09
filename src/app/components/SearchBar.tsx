import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => (
  <form onSubmit={handleSearch} className="flex justify-center mb-8">
    <input
      type="text"
      placeholder="Search for a recipe..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="border p-2 rounded-lg w-2/3 md:w-1/3"
    />
    <button
      type="submit"
      className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
    >
      Search
    </button>
  </form>
);

export default SearchBar;
