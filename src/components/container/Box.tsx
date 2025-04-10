export const Box = {
  sm: ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-gray-50 border border-gray-200 rounded-md w-1/3 max-w-sm min-w-64 p-4">{children}</div>;
  },
  md: ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-gray-50 border border-gray-200 rounded-md w-1/2 max-w-md min-w-72 p-4">{children}</div>;
  },
  lg: ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-gray-50 border border-gray-200 rounded-md w-2/3 max-w-lg min-w-96 p-4">{children}</div>;
  },
  full: ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-gray-50 border border-gray-200 rounded-md w-full p-4">{children}</div>;
  },
};
