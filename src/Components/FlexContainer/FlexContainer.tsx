import React from "react";
import "./FlexContainer.scss";

export type StringSizes = "xs" | "sm" | "md" | "lg" | "xl";

export interface IFlexParentProps {
  flex:
    | "row"
    | "col"
    | "wrap"
    | "no-wrap"
    | "row-wrap"
    | "row-no-wrap"
    | undefined;
  justify: "center" | "between" | "around" | "evenly" | undefined;
  align: "start" | "end" | "center" | "stretch" | "baseline" | undefined;
  colGap?: StringSizes;
  rowGap?: StringSizes;
}

export interface IFlexContainerProps extends IFlexParentProps {
  children?: React.ReactNode;
}

const makeClass = (props: IFlexParentProps): string => {
  const { flex, justify, align, rowGap, colGap } = props;
  const classNames = ["p-flex"];
  if (flex) {
    classNames.push(flex);
  } else {
    classNames.push("row");
  }
  if (justify) {
    classNames.push(justify);
  } else {
    classNames.push("start");
  }
  if (align) {
    classNames.push(`align-${align}`);
  } else {
    classNames.push("align-stretch");
  }
  if (rowGap) {
    classNames.push(`r-${rowGap}`);
  }
  if (colGap) {
    classNames.push(`c-${colGap}`);
  }
  return classNames.join(" ");
};

const FlexContainer = (props: IFlexContainerProps) => {
  const { children, ...flexProps } = props;
  const className = makeClass(flexProps);
  return <div className={className}>{children}</div>;
};

export default FlexContainer;
