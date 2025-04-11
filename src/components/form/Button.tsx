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
      <div className=".button-primary flex justify-center items-center">
        <button
          className={`${sizes[size]} bg-neutral-500 text-white font-semibold rounded-md hover:bg-neutral-600 transition duration-200`}
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    );
  },
  Secondary: ({ children, onClick = () => {}, size = "md" }: ButtonProps) => {
    return (
      <div className=".button-secondary flex justify-center items-center">
        <button
          className={`${sizes[size]} bg-neutral-500 text-white font-semibold rounded-md hover:bg-neutral-600 transition duration-200`}
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    );
  },
  Warn: ({ children, onClick = () => {}, size = "md" }: ButtonProps) => {
    return (
      <div className=".button-warn flex justify-center items-center">
        <button
          className={`${sizes[size]} bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200`}
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    );
  },
};
