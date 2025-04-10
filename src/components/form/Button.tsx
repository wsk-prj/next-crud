type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizes = {
  sm: "w-24 h-8",
  md: "w-32 h-10",
  lg: "w-40 h-12",
  xl: "w-48 h-14",
};

export const Button = {
  Primary: ({ children, onClick = () => {}, size = "md" }: ButtonProps) => {
    return (
      <button
        className={`.button-primary ${sizes[size]} mx-auto bg-neutral-500 text-white font-semibold rounded-md hover:bg-neutral-600 transition duration-200`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
  Secondary: ({ children, onClick = () => {}, size = "md" }: ButtonProps) => {
    return (
      <button
        className={`.button-secondary ${sizes[size]} mx-auto bg-neutral-500 text-white font-semibold rounded-md hover:bg-neutral-600 transition duration-200`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
  Warn: ({ children, onClick = () => {}, size = "md" }: ButtonProps) => {
    return (
      <button
        className={`.button-warn ${sizes[size]} mx-auto bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
};
