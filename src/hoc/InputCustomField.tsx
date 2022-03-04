import React from "react";
import classes from "./InputCustomField.module.css";

interface InputCustomFieldProps {
  text: string;
  placeholder: string;
  width:string;
}

const InputCustomField = ({text, placeholder, width}:InputCustomFieldProps) => {

  const inputFieldStyle = { 
    "width" : width,
  }

  return (
    <div className={classes.inputFieldWrapper}>
      <div className={classes.inputFieldWrapperChild}>
        <label className={classes.fieldLabel}>{text}</label>
        <input className={classes.inputField} type="text" placeholder={placeholder} style={inputFieldStyle}/>
      </div>
    </div>
  );
};

export default InputCustomField;
