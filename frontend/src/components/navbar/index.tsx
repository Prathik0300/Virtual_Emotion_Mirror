import { useNavbarContent } from "@/src/hooks/useNavbarContent";
import { navbarContainer, navbarContentContainer } from "./style";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { conditionalComponentList } = useNavbarContent();
  return (
    <nav className={navbarContainer}>
      <div>
        <Link href="/">
          <Image src="/VEM_logo.png" width={80} height={80} alt="VEM Logo" />
        </Link>
      </div>
      <div className={navbarContentContainer}>
        {conditionalComponentList?.map((component, idx) => (
          <div key={`navbar-${idx}`}>{component}</div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
