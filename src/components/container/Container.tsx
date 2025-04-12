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
      <div className=".container-md bg-white p-8 rounded-lg shadow-md w-1/2 max-w-md min-w-72 min-h-[24rem] flex flex-col justify-center items-center">
        {children}
      </div>
    );
  },
  lg: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className=".container-lg bg-white p-8 rounded-lg shadow-md w-2/3 max-w-lg min-w-96 min-h-[24rem] flex flex-col justify-center items-center">
        {children}
      </div>
    );
  },
  xl: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className=".container-xl bg-white p-8 rounded-lg shadow-md w-5/6 max-w-xl min-w-[24rem] min-h-[30rem] flex flex-col justify-center items-center">
        {children}
      </div>
    );
  },
  xxl: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className=".container-xxl bg-white p-8 rounded-lg shadow-md w-5/6 max-w-2xl min-w-[28rem] min-h-[30rem] flex flex-col justify-center items-center">
        {children}
      </div>
    );
  },
  xxxl: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className=".container-3xl bg-white p-8 rounded-lg shadow-md w-5/6 max-w-3xl min-w-[32rem] min-h-[40rem] flex flex-col justify-center items-center">
        {children}
      </div>
    );
  },
  xxxxl: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className=".container-4xl bg-white p-8 rounded-lg shadow-md w-5/6 max-w-4xl min-w-[36rem] flex flex-col justify-center items-center">
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
