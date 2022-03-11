import { styled, TextField } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import classNames from "./CustomInputComp.module.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  inputRoot: {
    "&$disabled": {
      color: "red",
    },
  },
  disabled: {},
}));

interface CustomInputCompProps {
  label: string;
  placeholder: string;
  value?: string | undefined;
  disabled?: boolean;
  change?: Function;
  index?: number;
  valueNotReferencedFromParent?: boolean;
  width?: string;
  type?: string;
}

const CustomInputComp = React.memo(
  ({
    label,
    placeholder,
    value,
    disabled = false,
    change = () => console.error("The operation could not be completer, Change event is undefined"),
    index = -1,
    valueNotReferencedFromParent = false,
    width,
    type,
  }: CustomInputCompProps) => {
    const [textValue, setTextValue] = useState<string>("");
    const [textLabel, setTextLabel] = useState<string>("");

    const classes = useStyles();

    useEffect(() => {
      setTextValue("");
    }, [label]);

    // const CustomTextField = styled(TextField)({
    //   input: {
    //     "&::placeholder": {
    //       color: "#95afc0",
    //       fontFamily: "IBM Plex Sans, sans-serif",
    //       fontSize: "16px",
    //     },
    //     "&:hover": {
    //       borderColor: "#54a0ff",
    //     },
    //   },
    //   "& .MuiOutlinedInput-root": {
    //     "& fieldset": {
    //       borderColor: "#00a8ff",
    //     },
    //     "&:hover fieldset": {
    //       borderColor: "#00a8ff",
    //     },
    //     "&.Mui-focused fieldset": {
    //       borderColor: "#00a8ff",
    //     },
    //   },
    // });

    return (
      <div>
        <p className={classNames.textBoxLabel}>{label}</p>
        <TextField
          type={type !== "" ? type : ""}
          color="info"
          focused
          className={classNames.textBox}
          required
          id="outlined-required"
          placeholder={placeholder}
          size="small"
          value={valueNotReferencedFromParent ? textValue : value}
          disabled={disabled}
          onChange={(e) => {
            if (valueNotReferencedFromParent) {
              setTextValue(e.target.value);
            }
            change(e, index);
            if (textLabel !== label) {
              setTextLabel(label);
            }
          }}
          InputProps={{
            classes: { root: classes.inputRoot, disabled: classes.disabled },
            style: {
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              color: "#c7ecee",
              width: width !== "" ? width : "300px",
            },
          }}
        />
      </div>
    );
  }
);

export default CustomInputComp;
