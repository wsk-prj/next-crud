interface FlexProps {
  children: React.ReactNode;
  justify?: "start" | "center" | "end" | "between";
  align?: "start" | "center" | "end" | "between";
}

const justifies = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};
const aligns = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  between: "items-between",
};

export const Flex = {
  Vertical: ({ children, justify = "start", align = "center" }: FlexProps) => {
    return (
      <div className={`.flex-vertical flex-1 w-full flex flex-col gap-y-4 ${justifies[justify]} ${aligns[align]}`}>
        {children}
      </div>
    );
  },
  Horizontal: ({ children, justify = "start", align = "center" }: FlexProps) => {
    return (
      <div className={`.flex-horizontal flex-1 w-full flex flex-row gap-x-4 ${justifies[justify]} ${aligns[align]}`}>
        {children}
      </div>
    );
  },
};
