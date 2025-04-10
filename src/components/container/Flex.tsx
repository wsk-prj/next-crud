export const Flex = {
  Vertical: ({ children }: { children: React.ReactNode }) => {
    return <div className=".flex flex-1 flex flex-col gap-y-4">{children}</div>;
  },
  Horizontal: ({ children }: { children: React.ReactNode }) => {
    return <div className=".flex flex-1 flex flex-row gap-x-4">{children}</div>;
  },
};
