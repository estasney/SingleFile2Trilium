import React from "react";
import "./Progress.scss";
import FlexContainer from "../FlexContainer/FlexContainer";

export interface IProgressProps {
  className?: string;
  secondary?: boolean;
}

const Progress = (props: IProgressProps) => {
  const { className, secondary } = props;
  return (
    <FlexContainer flex={"col"} align={"center"} justify={"center"}>
      <div className={"progress-container"}>
        <svg
          viewBox={"22 22 44 44"}
          className={
            className
              ? `progress--${secondary ? "secondary" : "primary"}
       ${className}`
              : `progress--${secondary ? "secondary" : "primary"}`
          }
        >
          <circle cx={"44"} cy={"44"} r={"20"} fill={"none"} />
        </svg>
      </div>
    </FlexContainer>
  );
};
export default Progress;
