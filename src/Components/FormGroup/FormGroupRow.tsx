import React from "react";

import "./FormGroupRow.scss";

const FormGroupRow: React.FC = ({ children }) => {
  return <div className={"form-group-row"}>{children}</div>;
};
export default FormGroupRow;
