export const isLoginDateExpired = (loggedInDate: Date, returningDate: Date) => {
  const time_difference = returningDate.getTime() - loggedInDate.getTime();
  const days = Math.round(time_difference / (1000 * 3600 * 24));
  if (days > 30) {
    return true;
  }
  return false;
};
