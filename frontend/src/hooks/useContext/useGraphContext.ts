import {
  GraphContextUpdater,
  GraphContextValue,
} from "@/src/context/GraphContext";
import { useContext } from "react";

export const useGraphContext = () => {
  const graphContextValues = useContext(GraphContextValue) || {};
  const graphContextUpdater = useContext(GraphContextUpdater) || {};

  return { graphContextValues, graphContextUpdater };
};
