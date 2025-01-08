import Image from "next/image";
import { loginContainer, logoContainer } from "./style";
import LoginForm from "@/src/components/loginForm";

const Login = () => {
  return (
    <div className={loginContainer}>
      <div className={logoContainer}>
        <Image
          src="/VEM_transparent.png"
          width={300}
          height={300}
          alt="Virtual Emotion Mirror Logo"
        />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
