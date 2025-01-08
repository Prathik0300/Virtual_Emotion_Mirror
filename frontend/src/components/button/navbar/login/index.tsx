import { Button } from "@mui/material";
import { loginButton } from "../../style";
import Link from "next/link";

const LoginButton = () => {
  return (
    <Link href="/login">
      <Button variant="contained" className={loginButton}>
        Login
      </Button>
    </Link>
  );
};

export default LoginButton;
