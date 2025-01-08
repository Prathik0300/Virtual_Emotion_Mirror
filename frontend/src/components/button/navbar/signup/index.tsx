import { Button } from "@mui/material";
import { signupButton } from "../../style";
import Link from "next/link";

const SignupButton = () => {
  return (
    <Link href="/signup">
      <Button variant="outlined" color="secondary" className={signupButton}>
        Sign Up
      </Button>
    </Link>
  );
};

export default SignupButton;
