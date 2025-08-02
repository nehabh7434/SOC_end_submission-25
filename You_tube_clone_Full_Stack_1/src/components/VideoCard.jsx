const VideoCard = ({
  video,
  liked,
  saved,
  onLike,
  onWatchLater,
  inWatchLaterPage = false
}) => {
  return (
    <div className="border p-2 rounded shadow hover:shadow-lg transition bg-white">
      
      {/* Thumbnail with duration overlay */}
      <div className="relative">
        <img src={video.thumbnail} alt={video.title} className="rounded w-full" />
        {video.duration && (
          <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 py-0.5 rounded">
            {video.duration}
          </span>
        )}
      </div>

      {/* Video title and details */}
      <div className="mt-2">
        <h3 className="text-sm font-semibold">{video.title}</h3>
        <p className="text-xs text-gray-500">{video.channel}</p>
        <p className="text-xs text-gray-500">{video.views} • {video.time}</p>
      </div>

      {/* Like and Watch Later buttons */}
      <div className="flex gap-4 mt-2">
        <button onClick={onLike} className="text-red-600 text-lg">
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>
        <button onClick={onWatchLater} className="text-blue-600 text-lg">
          {inWatchLaterPage ? "❌ Remove" : saved ? "✅ Saved" : "➕ Watch Later"}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;




