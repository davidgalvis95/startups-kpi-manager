import { Checkbox } from "@mui/material";
import { useState } from "react";
import classes from "./CustomCheckBoxComp.module.css";

interface CustomCheckBoxCompProps {
  labelBefore: boolean;
  name: string;
  click?: Function;
  renderFromParent?: boolean;
  checked?: boolean;
}

const CustomCheckBoxComp = ({
  labelBefore,
  name,
  renderFromParent,
  checked,
  click = () =>
    console.error("The operation could not be completed: 'click' is undefined"),
}: CustomCheckBoxCompProps) => {
  const [chekcedBox, setCheckedBox] = useState<boolean>(false);

  return (
    <div>
      {labelBefore ? (
        <div className={classes.chackBoxWrapper}>
          <p className={classes.textBoxLabel}>{name}</p>
          <Checkbox
            checked={checked}
            size="small"
            style={{
              color: "#00a8ff",
            }}
            onClick={(e) => {
              click(e, name, !checked);
            }}
          />
        </div>
      ) : (
        <div className={classes.chackBoxWrapper}>
          <Checkbox
            checked={checked}
            size="small"
            style={{
              color: "#00a8ff",
            }}
            //This checked prop will be passed as negative 
            onClick={(e) => click(e, name, !checked)}
          />
          <p className={classes.textBoxLabel}>{name}</p>
        </div>
      )}
    </div>
  );
};

export default CustomCheckBoxComp;
