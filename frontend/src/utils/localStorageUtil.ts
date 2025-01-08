export const getLocalStorageData = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setLocalStorageData = (
  key: string,
  value: string | Record<string, any>
) => {
  if (typeof value === "object") {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  return localStorage.setItem(key, value);
};

export const removeLocalStorageData = (key: string) => {
  return localStorage.removeItem(key);
};
