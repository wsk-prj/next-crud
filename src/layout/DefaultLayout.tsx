import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./main/Main";

const DefaultLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
