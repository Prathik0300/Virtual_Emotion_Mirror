import { css } from "@emotion/css";

export const loginForm = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: flex-start;
  color: var(--secondary-accent);
  margin: 0;
  height: 100%;
  gap: 20px;
`;

export const signInContainer = css`
  gap: 14px;
  display: flex;
  flex-direction: column;
`;

export const subtext = css`
  margin: 0;
  font-size: 15px;
`;

export const formControl = css`
  gap: 15px;
  margin-top: 10px;
  width: 100%;
`;

export const textfield = css`
  .MuiOutlinedInput-root {
    border-radius: 10px;
    font-size: 14px;
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
`;

export const loginButton = css`
  color: var(--primary-accent);
`;

export const forgotPassword = css`
  font-size: 11px;
  width: fit-content;
  text-decoration: underline;
  font-weight: 500;
`;

export const divider = css`
  gap: 15px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
`;
export const hrDivider = css`
  width: 109px;
  max-width: 109px;
  border: none;
  border-top: 1.5px solid var(--secondary-accent-light);
`;

export const fullWidthHrDivider = css`
  border: none;
  border-top: 1.5px solid var(--secondary-accent-light);
  width: 100%;
  max-width: 100%;
  margin: 10px 0;
`;

export const oauthBtn = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
`;

export const createAccountContainer = css`
  font-size: 12px;
  font-weight: 400;
`;

export const createAccountLink = css`
  margin: 0 2px;
  font-weight: 600;
  text-decoration: underline;
`;
