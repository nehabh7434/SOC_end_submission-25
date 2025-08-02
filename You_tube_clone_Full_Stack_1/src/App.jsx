import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import WatchLater from "./pages/WatchLater";
import Shorts from "./pages/shorts";
import Footer from "./components/Footer";


function App() {
  const [watchLater, setWatchLater] = useState([]);
  const [likes, setLikes] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let savedWatchLater = JSON.parse(sessionStorage.getItem("watchLater") || "[]");
    const savedLikes = JSON.parse(sessionStorage.getItem("likes") || "{}");

    
    if (savedWatchLater.length === 0) {
     
      import("./data/dummyVideos").then(({ videos }) => {
        
        const prefilled = videos.slice(0, 3);
        sessionStorage.setItem("watchLater", JSON.stringify(prefilled));
        setWatchLater(prefilled);
      });
    } else {
      setWatchLater(savedWatchLater);
    }

    setLikes(savedLikes);
  }, []);


  return (
    <Router>
      <Navbar
        watchLaterCount={watchLater.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  likes={likes}
                  setLikes={setLikes}
                  watchLater={watchLater}
                  setWatchLater={setWatchLater}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/watch-later"
              element={
                <WatchLater
                  watchLater={watchLater}
                  setWatchLater={setWatchLater}
                  likes={likes}
                  setLikes={setLikes}
                />
              }
            />
            
            <Route path="/premium" element={<p className="p-4">YouTube Premium</p>} />
            <Route path="/movies" element={<p className="p-4">Movies & Shows</p>} />
            <Route path="/live" element={<p className="p-4">Live content</p>} />
            <Route path="/gaming" element={<p className="p-4">Gaming zone</p>} />
            <Route path="/learning" element={<p className="p-4">Learning center</p>} />
            <Route path="/shorts" element={<Shorts />} />



          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;



