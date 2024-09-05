import React from "react";
import * as C from "./styles";

const Input = ({ type, name, placeholder, value, onChange }) => {
  return (
    <C.Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  );
};

export default Input;
