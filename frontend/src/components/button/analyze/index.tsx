import React from "react";
import { circularProgress, analyzeBtn } from "./style";

const AnalyzeButton = () => {
  return (
    <button className={analyzeBtn} disabled>
      Loading...
      <div className={circularProgress} />
    </button>
  );
};

export default AnalyzeButton;
