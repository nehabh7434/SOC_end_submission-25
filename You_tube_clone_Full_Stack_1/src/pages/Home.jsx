import { videos } from "../data/dummyVideos";
import VideoCard from "../components/VideoCard";

const Home = ({ likes, setLikes, watchLater, setWatchLater, searchQuery }) => {
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {filteredVideos.length > 0 ? (
        filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            watchLater={watchLater}
            setWatchLater={setWatchLater}
            likes={likes}
            setLikes={setLikes}
          />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">
          No videos found 😕
        </p>
      )}
    </div>
  );
};

export default Home;


