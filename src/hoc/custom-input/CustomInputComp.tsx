import { styled, TextField } from "@mui/material";
import classes from "./CustomInputComp.module.css";

interface CustomInputCompProps {
  label: string;
  placeholder: string;
}

const CustomInputComp = ({ label, placeholder }: CustomInputCompProps) => {
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
      <p className={classes.textBoxLabel}>{label}</p>
      <CustomTextField
        className={classes.textBox}
        required
        id="outlined-required"
        placeholder={placeholder}
        size="small"
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
};

export default CustomInputComp;
