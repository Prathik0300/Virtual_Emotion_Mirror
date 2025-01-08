export const isLoginDateExpired = (
  loggedInDate: Date,
  returningDate: Date,
  expiresIn = 2592000000
) => {
  console.log({ loggedInDate, returningDate, expiresIn });
  const time_difference = returningDate.getTime() - loggedInDate.getTime();
  const days = Math.round(time_difference / (1000 * 3600 * 24));
  const expires_in_days = Math.round(expiresIn / (1000 * 3600 * 24));
  if (days > expires_in_days) {
    return true;
  }
  return false;
};

export const isEmptyData = (dataStructure: any) => {
  if (Array.isArray(dataStructure) && dataStructure.length === 0) return true;
  if (
    typeof dataStructure === "object" &&
    Object.keys(dataStructure).length === 0
  )
    return true;
  if (typeof dataStructure === "string" && !dataStructure) return true;
  if (typeof dataStructure === "number") return false;
  if (!dataStructure) return true;

  return false;
};
