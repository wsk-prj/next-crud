const Content = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <div className=".content flex-1 rounded-lg py-4 bg-gray-100 flex flex-col items-center justify-center gap-y-4">
      {children}
    </div>
  );
};

export default Content;
