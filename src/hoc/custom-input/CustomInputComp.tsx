import { styled, TextField } from "@mui/material";
import React from "react";
import classNames from "./CustomInputComp.module.css";

interface CustomInputCompProps {
  label: string;
  placeholder: string;
  value?: string | undefined;
  disabled?: boolean;
  change?: Function;
  index?: number;
}

const CustomInputComp = React.memo(
  ({
    label,
    placeholder,
    value,
    disabled = false,
    change = () => console.log(""),
    index = -1
  }: CustomInputCompProps) => {

    const CustomTextField = styled(TextField)({
      input: {
        "&::placeholder": {
          color: "#95afc0",
          fontFamily: "IBM Plex Sans, sans-serif",
          fontSize: "16px",
        },
        "&:hover": {
          borderColor: "#54a0ff",
        },
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#00a8ff",
        },
        "&:hover fieldset": {
          borderColor: "#00a8ff",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#00a8ff",
        },
      },
    });
    
    return (
      <div>
        <p className={classNames.textBoxLabel}>{label}</p>
        <TextField
          color="info"
          focused
          className={classNames.textBox}
          required
          id="outlined-required"
          placeholder={placeholder}
          size="small"
          value={value}
          disabled={disabled}
          onChange={(e) => change(e, index)}
          InputProps={{
            style: {
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              color: "#c7ecee",
            },
          }}
        />
      </div>
    );
  }
);

export default CustomInputComp;
