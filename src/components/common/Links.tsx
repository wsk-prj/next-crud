import Link from "next/link";

type LinksProps = {
  children: React.ReactNode;
  href: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "danger";
};

const sizes = {
  sm: "w-24 h-8",
  md: "w-32 h-10",
  lg: "w-40 h-12",
  xl: "w-48 h-14",
};

const colors = {
  primary: "bg-neutral-700 hover:bg-neutral-800",
  secondary: "bg-neutral-500 hover:bg-neutral-600",
  danger: "bg-red-500 hover:bg-red-600",
};

export const Links = {
  Button: ({ children, href, size = "md", color = "primary" }: LinksProps) => {
    return (
      <div className=".link-button text-center flex justify-center items-center">
        <Link
          className={`${sizes[size]} rounded-md ${colors[color]} text-white font-semibold text-center flex justify-center items-center hover:bg-neutral-600 transition duration-200`}
          href={href}
        >
          {children}
        </Link>
      </div>
    );
  },
  Text: ({ children, href }: LinksProps) => {
    return (
      <div className=".link-text text-center flex justify-center items-center">
        <Link className={`text-neutral-500 hover:text-neutral-600 transition duration-200`} href={href}>
          {children}
        </Link>
      </div>
    );
  },
};
