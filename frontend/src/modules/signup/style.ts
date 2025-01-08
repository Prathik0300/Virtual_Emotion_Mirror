import { css } from "@emotion/css";

export const signupForm = css`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  background-color: var(--primary-accent);
  color: var(--secondary-accent);
  width: fit-content;
  height: fit-content;
  gap: 20px;
  padding: 30px;
  border-radius: 20px;
  z-index: 2;
  position: relative;
`;

export const formControl = css`
  gap: 15px;
  margin-top: 10px;
  width: 100%;
`;

export const textfield = css`
  .MuiOutlinedInput-root {
    border-radius: 10px;
    font-size: 18px;
    width: 100%;
  }

  .MuiOutlinedInput-input {
    padding: 8px 10px;
  }

  .MuiInputAdornment-root {
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
      fill: var(--secondary-accent);
    }
  }

  .MuiInputLabel-root {
    transform: translate(14px, 10px) scale(1);
  }
  .MuiInputLabel-shrink {
    transform: translate(18px, -8px) scale(0.75);
  }
`;

export const textContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: start;
  gap: 5px;
`;

export const subtext = css`
  margin: 0;
  font-size: 18px;
`;

export const signupButton = css`
  color: var(--primary-accent);
`;

export const alreadyUser = css`
  font-size: 12px;
  font-weight: 400;
`;

export const loginLink = css`
  margin: 0 2px;
  font-weight: 600;
  text-decoration: underline;
`;
