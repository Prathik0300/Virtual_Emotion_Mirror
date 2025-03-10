import GraphContextProvider from "./GraphContext";
import UserContextProvider from "./UserContext";

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserContextProvider>
      <GraphContextProvider>{children}</GraphContextProvider>
    </UserContextProvider>
  );
};

export default AppContextProvider;
