import Cookies from "js-cookie";

export const setCookieData = (name: string, value: string, options?: any) => {
  Cookies.set(name, value, options);
};

export const getCookieData = (name: string) => {
  try {
    return Cookies.get(name);
  } catch {
    return "";
  }
};

export const removeCookieData = (name: string) => {
  Cookies.remove(name);
};
