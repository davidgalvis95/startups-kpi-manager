import { Checkbox } from "@mui/material";
import classes from "./CustomCheckBoxComp.module.css";

interface CustomCheckBoxCompProps {
  labelBefore: boolean;
  name: string;
}

const CustomCheckBoxComp = ({ labelBefore, name }: CustomCheckBoxCompProps) => {
  return (
    <div>
      {labelBefore ? (
        <div className={classes.chackBoxWrapper}>
          <p className={classes.textBoxLabel}>{name}</p>
          <Checkbox
            size="small"
            style={{
              color: "#00a8ff",
            }}
          />
        </div>
      ) : (
        <div className={classes.chackBoxWrapper}>
          <Checkbox
            size="small"
            style={{
              color: "#00a8ff",
            }}
          />
          <p className={classes.textBoxLabel}>{name}</p>
        </div>
      )}
    </div>
  );
};

export default CustomCheckBoxComp;
