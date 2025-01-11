import {
  signInContainer,
  subtext,
  loginForm,
  textfield,
  formControl,
  loginButton,
  forgotPassword,
  divider,
  oauthBtn,
  hrDivider,
  fullWidthHrDivider,
  createAccountContainer,
  createAccountLink,
} from "./style";
import { Button, FormControl, InputAdornment } from "@mui/material";
import Link from "next/link";

import { useOAuthValidation } from "@/src/hooks/useOAuthValidation";
import Image from "next/image";
import { usePasswordVisibility } from "@/src/hooks/modules/login/usePasswordVisibility";
import { EmailTextField, PasswordTextField } from "../Textfield";
import { useLogin } from "@/src/hooks/modules/login/useLogin";

const LoginForm = () => {
  const { login, GoogleOneTap } = useOAuthValidation();
  const {
    isPasswordVisible,
    togglePasswordVisibility,
    PasswordVisibilityIcon,
  } = usePasswordVisibility();
  const { email, password, error, handleOnChange, validateInput, onLogin } =
    useLogin();

  return (
    <div className={loginForm}>
      <div className={signInContainer}>
        <div>
          <h1>Hi there...</h1>
          <p className={subtext}>Please enter your email and password</p>
        </div>
        <FormControl className={formControl}>
          <EmailTextField
            className={textfield}
            variant="outlined"
            type="email"
            error={error.email.status}
            helperText={error.email.msg}
            placeholder="someone@example.com"
            value={email}
            onBlur={validateInput("email")}
            onChange={(e) => handleOnChange(e, "email")}
          />
          <PasswordTextField
            className={textfield}
            variant="outlined"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => handleOnChange(e, "password")}
            value={password}
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
          <Link href="/" className={forgotPassword}>
            Forgot password
          </Link>
          <Button
            variant="contained"
            type="submit"
            className={loginButton}
            onClick={onLogin}
          >
            Login
          </Button>
        </FormControl>
      </div>
      <div className={divider}>
        <hr className={hrDivider} />
        or
        <hr className={hrDivider} />
      </div>
      <div>
        <Button variant="outlined" className={oauthBtn} onClick={() => login()}>
          <Image
            src="/google_logo.png"
            width={20}
            height={20}
            alt="google logo"
          />
          <span>Log In with Google</span>
        </Button>
        <GoogleOneTap />
      </div>
      <div>
        <hr className={fullWidthHrDivider} />
        <p className={createAccountContainer}>
          Don&apos;t have an account?
          <Link className={createAccountLink} href="/signup">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
