import { BaseSyntheticEvent, useState } from "react";

export const useDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabValueChange = (e: BaseSyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return {
    tabValue,
    handleTabValueChange,
  };
};
