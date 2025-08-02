import VideoCard from "../components/VideoCard";

const WatchLater = ({ watchLater, setWatchLater, likes, setLikes }) => {
  const removeFromWatchLater = (video) => {
    const updated = watchLater.filter((v) => v.id !== video.id);
    setWatchLater(updated);
    sessionStorage.setItem("watchLater", JSON.stringify(updated));
  };

  const toggleLike = (videoId) => {
    const updatedLikes = { ...likes, [videoId]: !likes[videoId] };
    setLikes(updatedLikes);
    sessionStorage.setItem("likes", JSON.stringify(updatedLikes));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📺 Watch Later</h2>
      {watchLater.length === 0 ? (
        <p className="text-gray-500">No videos saved to watch later.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {watchLater.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              liked={likes[video.id]}
              onLike={() => toggleLike(video.id)}
              saved={true}
              onWatchLater={() => removeFromWatchLater(video)}
              inWatchLaterPage={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLater;


