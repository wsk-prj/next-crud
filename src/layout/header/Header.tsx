import Link from "next/link";

const Header = (): React.ReactNode => {
  return (
    <header id="header" className="px-4 h-16 bg-neutral-800 text-white text-2xl flex items-center justify-center">
      <Link href="/">
        <h1>Header</h1>
      </Link>
    </header>
  );
};

export default Header;
