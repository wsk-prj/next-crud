interface TextProps {
  children: React.ReactNode;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
}

const textWeight = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const textAlign = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const Text = {
  sm: ({ children, weight = "light", align = "left" }: TextProps) => {
    return <p className={`.text text-sm ${textWeight[weight]} text-gray-700 ${textAlign[align]}`}>{children}</p>;
  },
  md: ({ children, weight = "normal", align = "left" }: TextProps) => {
    return <p className={`.text text-md ${textWeight[weight]} text-gray-700 ${textAlign[align]}`}>{children}</p>;
  },
  lg: ({ children, weight = "semibold", align = "left" }: TextProps) => {
    return <p className={`.text text-lg ${textWeight[weight]} text-gray-700 ${textAlign[align]}`}>{children}</p>;
  },
};
