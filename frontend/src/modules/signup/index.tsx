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
  divider,
  privacyPolicyContainer,
} from "./style";
import { usePasswordVisibility } from "@/src/hooks/modules/login/usePasswordVisibility";
import Link from "next/link";
import {
  EmailTextField,
  NormalTextField,
  PasswordTextField,
} from "@/src/components/Textfield";
import { useSignup } from "@/src/hooks/modules/signup/useSignup";

const Signup = () => {
  const {
    isPasswordVisible,
    isConfirmPasswordVisible,
    togglePasswordVisibility,
    PasswordVisibilityIcon,
  } = usePasswordVisibility();
  const {
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    error,
    handleOnChange,
    validateInput,
    onSignup,
  } = useSignup();

  return (
    <div className="alignmentContainer">
      <div className={signupForm}>
        <div className={textContainer}>
          <h1>Sign Up</h1>
          <p className={subtext}>Let&apos;s get you started...</p>
        </div>
        <FormControl className={formControl}>
          <NormalTextField
            className={textfield}
            variant="outlined"
            label="First Name"
            value={firstName}
            error={error.firstName.status}
            helperText={error.firstName.msg}
            onBlur={validateInput("firstName")}
            onChange={(e) => handleOnChange(e, "firstName")}
            required
          />
          <NormalTextField
            className={textfield}
            variant="outlined"
            label="Last Name"
            value={lastName}
            error={error.lastName.status}
            helperText={error.lastName.msg}
            onBlur={validateInput("lastName")}
            onChange={(e) => handleOnChange(e, "lastName")}
          />
          <EmailTextField
            className={textfield}
            variant="outlined"
            label="Email"
            required
            value={email}
            error={error.email.status}
            helperText={error.email.msg}
            onBlur={validateInput("email")}
            onChange={(e) => handleOnChange(e, "email")}
          />
          <PasswordTextField
            className={textfield}
            variant="outlined"
            label="Password"
            required
            value={password}
            error={error.password.status}
            helperText={error.password.msg}
            type={isPasswordVisible ? "text" : "password"}
            onBlur={validateInput("password")}
            onChange={(e) => handleOnChange(e, "password")}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={togglePasswordVisibility()}
                >
                  <PasswordVisibilityIcon
                    isPasswordVisible={isPasswordVisible}
                  />
                </InputAdornment>
              ),
            }}
          />
          <PasswordTextField
            className={textfield}
            variant="outlined"
            type={isConfirmPasswordVisible ? "text" : "password"}
            label="Confirm Password"
            required
            value={confirmPassword}
            error={error.confirmPassword.status}
            helperText={error.confirmPassword.msg}
            onBlur={validateInput("confirmPassword")}
            onChange={(e) => handleOnChange(e, "confirmPassword")}
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
          <Button
            variant="contained"
            type="submit"
            className={signupButton}
            onClick={onSignup}
          >
            Signup
          </Button>
        </FormControl>
        <div className={alreadyUser}>
          Already have an account?
          <Link className={loginLink} href="/login">
            Log In
          </Link>
        </div>
        <hr className={divider} />
        <p className={privacyPolicyContainer}>
          By signing up to create an account I accept Company&apos;s Terms of
          Use and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Signup;
