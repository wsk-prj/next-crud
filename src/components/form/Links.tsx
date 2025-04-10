import Link from "next/link";

type LinksProps = {
  children: React.ReactNode;
  href: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizes = {
  sm: "w-24 h-8",
  md: "w-32 h-10",
  lg: "w-40 h-12",
  xl: "w-48 h-14",
};

export const Links = {
  Button: ({ children, href, size = "md" }: LinksProps) => {
    return (
      <div className=".link text-center flex justify-center items-center">
        <Link
          className={`${sizes[size]} rounded-md bg-neutral-500 text-white font-semibold text-center flex justify-center items-center hover:bg-neutral-600 transition duration-200`}
          href={href}
        >
          {children}
        </Link>
      </div>
    );
  },
  Text: ({ children, href }: LinksProps) => {
    return (
      <div className=".link text-center flex justify-center items-center">
        <Link className={`text-neutral-500 hover:text-neutral-600 transition duration-200`} href={href}>
          {children}
        </Link>
      </div>
    );
  },
};
