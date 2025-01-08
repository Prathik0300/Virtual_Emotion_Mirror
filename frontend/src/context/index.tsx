import UserContextProvider from "./UserContext";

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default AppContextProvider;
