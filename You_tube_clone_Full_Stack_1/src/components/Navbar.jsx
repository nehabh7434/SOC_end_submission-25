import { Link } from "react-router-dom";

const Navbar = ({ watchLaterCount, searchQuery, setSearchQuery }) => {
  return (
    <nav className="flex flex-col md:flex-row gap-2 md:gap-4 justify-between items-center px-4 py-3 bg-red-600 text-white">
      <Link to="/" className="text-xl font-bold">MiniTube 🎬</Link>

      <input
        type="text"
        placeholder="Search videos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-2 py-1 rounded text-black w-full md:w-1/3"
      />

      <Link to="/watch-later" className="relative">
        Watch Later
        {watchLaterCount > 0 && (
          <span className="ml-2 bg-white text-red-600 px-2 py-0.5 rounded-full text-sm">
            {watchLaterCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;


