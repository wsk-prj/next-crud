export const Container = {
  sm: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className=".container-sm bg-white p-8 rounded-lg shadow-md w-1/3 max-w-sm min-w-64 flex flex-col justify-center items-center">
        {children}
      </div>
    );
  },
  md: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className=".container-md bg-white p-8 rounded-lg shadow-md w-1/2 max-w-md min-w-72 flex flex-col justify-center items-center">
        {children}
      </div>
    );
  },
  lg: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className=".container-lg bg-white p-8 rounded-lg shadow-md w-2/3 max-w-lg min-w-96 flex flex-col justify-center items-center">
        {children}
      </div>
    );
  },
  full: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className=".container-full bg-white p-8 rounded-lg w-full flex flex-col justify-center items-center">
        {children}
      </div>
    );
  },
};
