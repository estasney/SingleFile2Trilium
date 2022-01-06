import React from "react";

export interface IFlexChildProps {
  grow?: FlexShrink;
  shrink?: FlexShrink;
}

type FlexShrink = 1 | 2 | 3 | 4 | 5 | 6;
type FlexShrinkName = "one" | "two" | "three" | "four" | "five" | "six";

export interface IFlexItemProps extends IFlexChildProps {
  children?: React.ReactChild;
}

const makeClass = (props: IFlexChildProps) => {
  const { grow, shrink } = props;
  const classNames = ["i-flex"];
  const numberName = new Map<FlexShrink, FlexShrinkName>([
    [1, "one"],
    [2, "two"],
    [3, "three"],
    [4, "four"],
    [5, "five"],
    [6, "six"],
  ]);
  if (grow) {
    classNames.push(`grow-${numberName.get(grow)}`);
  }
  if (shrink) {
    classNames.push(`shrink=${numberName.get(shrink)}`);
  }
  return classNames.join(" ");
};

const FlexItem = (props: IFlexItemProps) => {
  const { children, ...flexBasis } = props;
  const className = makeClass(flexBasis);
  return <div className={className}>{children}</div>;
};

export default FlexItem;
