import { Link, useLocation } from "react-router-dom";
import {
  MdHome,
  MdPlayArrow,
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdWatchLater,
  MdThumbUp,
  MdHistory,
  MdPerson,
  MdTrendingUp,
  MdShoppingBag,
  MdDiamond,
  MdLiveTv,
  MdLocalMovies,
  MdSportsEsports,
  MdSchool,
} from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 transition ${
      location.pathname === path ? "bg-gray-200 font-semibold" : ""
    }`;

  const Divider = () => <hr className="my-2 border-gray-300" />;

  return (
    <aside className="w-60 bg-white border-r h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto hidden md:block text-sm">
      <div className="flex flex-col py-4">

        {/* MAIN */}
        <Link to="/" className={linkClass("/")}>
          <MdHome /> Home
        </Link>
        <Link to="/shorts" className={linkClass("/shorts")}>
          <MdPlayArrow /> Shorts
        </Link>
        <Link to="/subscriptions" className={linkClass("/subscriptions")}>
          <MdSubscriptions /> Subscriptions
        </Link>
        <Divider />

        {/* YOU */}
        <span className="px-4 text-gray-500 font-semibold mb-1">You</span>
        <Link to="/history" className={linkClass("/history")}>
          <MdHistory /> History
        </Link>
        <Link to="/playlists" className={linkClass("/playlists")}>
          <MdOutlineVideoLibrary /> Playlists
        </Link>
        <Link to="/watch-later" className={linkClass("/watch-later")}>
          <MdWatchLater /> Watch Later
        </Link>
        <Link to="/liked" className={linkClass("/liked")}>
          <MdThumbUp /> Liked Videos
        </Link>
        <Divider />

        {/* SUBSCRIPTIONS */}
        <span className="px-4 text-gray-500 font-semibold mb-1">Subscriptions</span>
        <Link to="#" className={linkClass("#")}>
          <MdPerson /> Code Help
        </Link>
        <Link to="#" className={linkClass("#")}>
          <MdPerson /> Tikki Babu
        </Link>
        <Link to="/subscriptions" className={linkClass("/subscriptions")}>
          <MdSubscriptions /> All Subscriptions
        </Link>
        <Divider />

        {/* EXPLORE */}
        <span className="px-4 text-gray-500 font-semibold mb-1">Explore</span>
        <Link to="/trending" className={linkClass("/trending")}>
          <MdTrendingUp /> Trending
        </Link>
        <Link to="/shopping" className={linkClass("/shopping")}>
          <MdShoppingBag /> Shopping
        </Link>
        <Divider />

        {/* MORE FROM YOUTUBE */}
        <span className="px-4 text-gray-500 font-semibold mb-1">More from YouTube</span>
        <Link to="/premium" className={linkClass("/premium")}>
          <MdDiamond /> YouTube Premium
        </Link>
        <Link to="/movies" className={linkClass("/movies")}>
          <MdLocalMovies /> Movies & Shows
        </Link>
        <Link to="/live" className={linkClass("/live")}>
          <MdLiveTv /> Live
        </Link>
        <Link to="/gaming" className={linkClass("/gaming")}>
          <MdSportsEsports /> Gaming
        </Link>
        <Link to="/learning" className={linkClass("/learning")}>
          <MdSchool /> Learning
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;



