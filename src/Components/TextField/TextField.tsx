import React from "react";
import "./TextField.scss";
export interface ITextFieldProps {
  value: string;
  placeholder?: string;
  label: string;
  onChange: (val: string) => void;
  className?: string;
}

const TextField = (props: ITextFieldProps) => {
  const { value, onChange, label, placeholder } = props;
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <>
      <label className={"textfield-label"}>{label}</label>
      <div className={"textfield"}>
        <input
          inputMode={"text"}
          value={value}
          placeholder={placeholder}
          onChange={handleValueChange}
          className={"textfield-input"}
        />
      </div>
    </>
  );
};

export default TextField;
