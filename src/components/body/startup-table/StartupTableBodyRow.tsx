import React from "react";
import { StartUpBodyRowContent } from "../../../types/types";
import classes from "./StartupTableBodyRow.module.css";
import { FaDotCircle } from "react-icons/fa";

interface StartupTableBodyRowProps {
  cellsContent: StartUpBodyRowContent;
}

const StartupTableBodyRow = ({ cellsContent }: StartupTableBodyRowProps) => {

    const dotStyle = {
        "color": cellsContent.status === "Activa"? "#33d9b2": "#ff5252",
        "marginRight":"5px"
    }
  console.log(cellsContent.photoUrl);
  return (
    <tr>
      <td className={classes.column1}>
        <img
          className={classes.profileImage}
          src={cellsContent.photoUrl}
          width="100%"
        />
        {/* <img className={classes.profileImage} src="" width="100%" /> */}
      </td>
      <td className={classes.column2}>{cellsContent.name}</td>
      <td className={classes.column3}>
        <div className={classes.activeCell}>
            <div>
            <FaDotCircle style={dotStyle}/>
            </div>
          {cellsContent.status}
        </div>
      </td>
      <td className={classes.column4}>{cellsContent.address}</td>
      <td className={classes.column5}>{cellsContent.city}</td>
      <td className={classes.column6}>{cellsContent.affiliationDate}</td>
    </tr>
  );
};

export default StartupTableBodyRow;
