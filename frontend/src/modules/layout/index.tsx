import Navbar from "@/src/components/navbar";
import { layoutContainer, childContainer } from "./style";
// import Footer from "@/src/components/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={layoutContainer}>
      <Navbar />
      <div className={childContainer}>{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
