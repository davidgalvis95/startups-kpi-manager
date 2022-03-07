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
    console.log("The operation could not be completed: 'click' is undefined"),
}: CustomCheckBoxCompProps) => {
  const [chekcedBox, setCheckedBox] = useState<boolean>(false);

  return (
    <div>
      {labelBefore ? (
        <div className={classes.chackBoxWrapper}>
          <p className={classes.textBoxLabel}>{name}</p>
          <Checkbox
            checked={renderFromParent ? checked : chekcedBox}
            size="small"
            style={{
              color: "#00a8ff",
            }}
            onClick={(e) => {
              setCheckedBox(!chekcedBox);
              click(e, name);
            }}
          />
        </div>
      ) : (
        <div className={classes.chackBoxWrapper}>
          <Checkbox
            checked={renderFromParent ? checked : chekcedBox}
            size="small"
            style={{
              color: "#00a8ff",
            }}
            onClick={(e) => {
              setCheckedBox(!chekcedBox);
              click(e, name);
            }}
          />
          <p className={classes.textBoxLabel}>{name}</p>
        </div>
      )}
    </div>
  );
};

export default CustomCheckBoxComp;
