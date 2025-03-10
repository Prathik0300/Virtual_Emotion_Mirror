import { getUserEmotionAnalysis } from "@/src/apis/imageAnalysis";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../../useContext/useUserContext";
import { TAB_VALUE_MAP } from "@/src/constants/enums";
import { generateGraphDataKey } from "@/src/utils/commonUtils";
import { useEffect } from "react";
import { useGraphContext } from "../../useContext/useGraphContext";

export const useGraph = ({ tabValue, isEmotionAnalysisCompleted }: any) => {
  const {
    userContextValues: { userProfile, accessToken },
  } = useUserContext();
  const {
    graphContextUpdater: {
      setLatestGraphData,
      setLatestTransformedGraphData,
      setDominantEmotion,
    },
  } = useGraphContext();
  
  const {
    data: graphData,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: [userProfile.email, accessToken, tabValue],
    queryFn: () => getUserEmotionAnalysis(userProfile.email),
    select: (data: any) => {
      setLatestGraphData(data.data.data);
      const { data: { data: { emotion_analysis = {} } = {} } = {} } = data;
      const targetData = emotion_analysis[TAB_VALUE_MAP[tabValue]];
      const transformedData = [];
      let dominantEmotion;
      for (const [key, val] of Object.entries(targetData)) {
        dominantEmotion = val.dominant_emotion;
        transformedData.push({
          ...val.emotion,
          dataKey: generateGraphDataKey(key),
        });
      }
      setDominantEmotion(dominantEmotion);
      return transformedData;
    },
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isSuccess && typeof setLatestTransformedGraphData === "function") {
      setLatestTransformedGraphData(graphData);
    }
  }, [isSuccess, graphData, setLatestTransformedGraphData]);

  useEffect(() => {
    if (isEmotionAnalysisCompleted) {
      refetch();
    }
  }, [isEmotionAnalysisCompleted, refetch]);

  return { graphData, isLoading, isError };
};
