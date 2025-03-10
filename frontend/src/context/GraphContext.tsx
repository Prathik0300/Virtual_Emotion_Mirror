import { createContext, useMemo, useState } from "react";

export const GraphContextValue = createContext({});
export const GraphContextUpdater = createContext({});

const GraphContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [latestGraphData, setLatestGraphData] = useState({});
  const [latestTransformedGraphData, setLatestTransformedGraphData] = useState(
    []
  );
  const [dominantEmotion, setDominantEmotion] = useState("neutral");

  const contextValues = useMemo(
    () => ({ latestGraphData, latestTransformedGraphData, dominantEmotion }),
    [latestGraphData, latestTransformedGraphData, dominantEmotion]
  );

  const contextUpdater = useMemo(
    () => ({
      setLatestGraphData,
      setLatestTransformedGraphData,
      setDominantEmotion,
    }),
    [setLatestGraphData, setLatestTransformedGraphData, setDominantEmotion]
  );
  return (
    <GraphContextUpdater.Provider value={contextUpdater}>
      <GraphContextValue.Provider value={contextValues}>
        {children}
      </GraphContextValue.Provider>
    </GraphContextUpdater.Provider>
  );
};

export default GraphContextProvider;
