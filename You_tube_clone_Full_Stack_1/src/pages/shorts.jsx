const shorts = [
  {
    id: 1,
    title: "React in 30s",
    channel: "DevShorts",
    views: "1.2M",
    time: "1 day ago",
    thumbnail: "/thumbnails/short1.png",
  },
  {
    id: 2,
    title: "CSS Hack You Need",
    channel: "QuickCSS",
    views: "680K",
    time: "3 days ago",
    thumbnail: "/thumbnails/short2.png",
  },
  {
    id: 3,
    title: "JS Tip: Optional Chaining",
    channel: "JS Crumbs",
    views: "900K",
    time: "6 hours ago",
    thumbnail: "/thumbnails/short1.png",
  }
];

const Shorts = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🔥 Shorts</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shorts.map((video) => (
          <div key={video.id} className="bg-white shadow rounded overflow-hidden">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-2">
              <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
              <p className="text-xs text-gray-500">{video.channel}</p>
              <p className="text-xs text-gray-500">{video.views} • {video.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shorts;
