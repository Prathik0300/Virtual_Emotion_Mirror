import { useNavbarContent } from "@/src/hooks/useNavbarContent";
import {
  navbarContainer,
  navbarContentContainer,
  logoContainer,
} from "./style";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { conditionalComponentList } = useNavbarContent();
  return (
    <nav className={navbarContainer}>
      <div className={logoContainer}>
        <Link href="/">
          <Image src="/VEM_logo.png" width={80} height={80} alt="VEM Logo" />
        </Link>
      </div>
      <div className={navbarContentContainer}>
        {conditionalComponentList?.map((component) => component)}
      </div>
    </nav>
  );
};

export default Navbar;
