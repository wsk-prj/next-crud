export const Table = {
  table: ({ children }: { children: React.ReactNode }) => {
    return <table className="w-full border-collapse border border-gray-300">{children}</table>;
  },
  head: ({ children }: { children: React.ReactNode }) => {
    return <thead className="bg-gray-100">{children}</thead>;
  },
  body: ({ children }: { children: React.ReactNode }) => {
    return <tbody>{children}</tbody>;
  },
  tr: ({ children }: { children: React.ReactNode }) => {
    return <tr className="hover:bg-gray-50">{children}</tr>;
  },
  th: {
    xs: ({ children }: { children: React.ReactNode }) => {
      return <th className=".th-xs w-[6.666666%] min-w-12 border border-gray-300 p-2 text-sm">{children}</th>;
    },
    sm: ({ children }: { children: React.ReactNode }) => {
      return <th className=".th-sm w-[10%] min-w-16 border border-gray-300 p-2 text-sm">{children}</th>;
    },
    md: ({ children }: { children: React.ReactNode }) => {
      return <th className=".th-md w-[15%] min-w-24 border border-gray-300 p-2 text-sm">{children}</th>;
    },
    lg: ({ children }: { children: React.ReactNode }) => {
      return <th className=".th-lg w-[20%] min-w-28 border border-gray-300 p-2 text-sm">{children}</th>;
    },
    xl: ({ children }: { children: React.ReactNode }) => {
      return <th className=".th-xl w-[33%] min-w-40 border border-gray-300 p-2 text-sm">{children}</th>;
    },
    xxl: ({ children }: { children: React.ReactNode }) => {
      return <th className=".th-xxl w-[50%] min-w-56 border border-gray-300 p-2 text-sm">{children}</th>;
    },
    auto: ({ children }: { children: React.ReactNode }) => {
      return <th className=".th-auto w-auto border border-gray-300 p-2 text-sm">{children}</th>;
    },
  },
  td: ({ children, align }: { children: React.ReactNode; align?: "left" | "center" | "right" }) => {
    return (
      <td
        className={`border border-gray-300 p-2 ${
          align === "left" ? "text-left" : align === "center" ? "text-center" : "text-right"
        }`}
      >
        {children}
      </td>
    );
  },
};
