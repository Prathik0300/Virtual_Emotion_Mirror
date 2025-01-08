import Login from "@/src/modules/login";
import LottieApp from "@/src/lib/Lottie";
import background from "@/public/lottie/background.json";

const LoginPage = () => {
  return (
    <>
      <Login />

      <LottieApp
        animationData={background}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          opacity: "0.5",
        }}
        height={"100%"}
        width={"100%"}
      />
    </>
  );
};

export default LoginPage;
