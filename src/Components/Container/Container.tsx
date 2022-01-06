import React from "react";
import "./Container.scss";

const Container: React.FC = ({ children }) => {
  return <div className={"container"}>{children}</div>;
};

export default Container;
