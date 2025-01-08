import { Button, FormControl, InputAdornment, TextField } from "@mui/material";
import {
  formControl,
  signupForm,
  textContainer,
  textfield,
  subtext,
  signupButton,
  alreadyUser,
  loginLink,
} from "./style";
import { usePasswordVisibility } from "@/src/hooks/modules/login/usePasswordVisibility";
import Link from "next/link";

const Signup = () => {
  const {
    isPasswordVisible,
    isConfirmPasswordVisible,
    togglePasswordVisibility,
    PasswordVisibilityIcon,
  } = usePasswordVisibility();
  return (
    <div className={signupForm}>
      <div className={textContainer}>
        <h1>Sign Up</h1>
        <p className={subtext}>Let&apos;s get you started...</p>
      </div>
      <FormControl className={formControl}>
        <TextField
          className={textfield}
          variant="outlined"
          label="First Name"
          required
        />
        <TextField className={textfield} variant="outlined" label="Last Name" />
        <TextField
          className={textfield}
          variant="outlined"
          type="email"
          label="Email"
          required
        />
        <TextField
          className={textfield}
          variant="outlined"
          label="Password"
          required
          type={isPasswordVisible ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={togglePasswordVisibility()}
              >
                <PasswordVisibilityIcon isPasswordVisible={isPasswordVisible} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={textfield}
          variant="outlined"
          type={isConfirmPasswordVisible ? "text" : "password"}
          label="Confirm Password"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={togglePasswordVisibility(true)}
              >
                <PasswordVisibilityIcon
                  isPasswordVisible={isConfirmPasswordVisible}
                />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" type="submit" className={signupButton}>
          Signup
        </Button>
      </FormControl>
      <div className={alreadyUser}>
        Already have an account?
        <Link className={loginLink} href="/login">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
