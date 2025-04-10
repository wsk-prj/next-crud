export const Title = {
  h1: ({ children }: { children: React.ReactNode }) => {
    return <h1 className=".title text-3xl font-bold text-center">{children}</h1>;
  },
  h2: ({ children }: { children: React.ReactNode }) => {
    return <h2 className=".title text-2xl font-bold text-center">{children}</h2>;
  },
  h3: ({ children }: { children: React.ReactNode }) => {
    return <h3 className=".title text-xl font-bold text-center">{children}</h3>;
  },
  h4: ({ children }: { children: React.ReactNode }) => {
    return <h4 className=".title text-lg font-bold text-center">{children}</h4>;
  },
  h5: ({ children }: { children: React.ReactNode }) => {
    return <h5 className=".title text-base font-bold text-center">{children}</h5>;
  },
  h6: ({ children }: { children: React.ReactNode }) => {
    return <h6 className=".title text-sm font-bold text-center">{children}</h6>;
  },
};
