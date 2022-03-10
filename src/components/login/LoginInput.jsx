import React from "react";
import "./Login.scss";


const LabelInput = ({ id, type, label, disabled }) => (
  <input
    className="form-group__input"
    type={type}
    id={id}
    placeholder={label}
    disabled={disabled}
  />
);
export default LabelInput;