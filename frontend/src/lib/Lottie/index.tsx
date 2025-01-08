import dynamic from "next/dynamic";
import { lottieStyles } from "./style";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

export const LOTTIE_DEFAULT_SETTINGS = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
} as const;

const LottieApp = ({
  isCursorPointer = false,
  animationData,
  height,
  width,
  onClickHandler,
  style = {},
}: any) => {
  const handleLottieClick = () => {
    if (onClickHandler) {
      onClickHandler();
    }
  };
  return (
    <div
      onClick={handleLottieClick}
      style={style}
      className={lottieStyles(isCursorPointer, width, height)}
    >
      <Lottie
        width={width}
        height={height}
        options={{ ...LOTTIE_DEFAULT_SETTINGS, animationData }}
      />
    </div>
  );
};

export default LottieApp;
