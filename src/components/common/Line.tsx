const Line = {
  Horizontal: () => {
    return <div className="w-full h-px my-2 bg-gray-200" />;
  },
  Vertical: () => {
    return <div className="w-px h-full mx-2 bg-gray-200" />;
  },
};

export default Line;
