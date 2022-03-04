import React, { useEffect, useState } from "react";
import "./StartupTable.module.css";
import Card from "../../../hoc/Card";
import { StartUpBodyRowContent } from "../../../types/types";
import StartupTableBodyRow from "./StartupTableBodyRow";
import StartupTableHeadRow from "./StartupTableHeadRow";
import classes from "./StartupTable.module.css";
import CustomButton from "../../../hoc/CustomButton";
import InputCustomField from "../../../hoc/InputCustomField";
import { range } from "../../../util/RangeGenerator";

interface StartupTableProps {
  contentArray: StartUpBodyRowContent[];
}

const numberOfElementsPerPage: number = 13;

const StartupTable = ({ contentArray }: StartupTableProps) => {
  const [numberOfPageButtons, setNumberOfPageButtons] =
    useState<JSX.Element[]>();
  const [rowsContentArray, setRowsContentArray] = useState<
    StartUpBodyRowContent[]
  >(contentArray.filter((el, i) => i < numberOfElementsPerPage));

  useEffect(() => {
    pages();
  }, [contentArray.length]);

  const pages = () => {
    const numberOfPages = Math.ceil(
      contentArray.length / numberOfElementsPerPage
    );
    const buttons: JSX.Element[] = range(1, numberOfPages + 1).map(
      (pagenumber: number) => (
        <CustomButton
          key={pagenumber}
          clickHandler={() => switchPageHandler(pagenumber)}
          text={pagenumber.toString()}
          padding={"8px"}
          width={"40px"}
          fontSize={"15px"}
        />
      )
    );
    setNumberOfPageButtons(buttons);
  };

  const switchPageHandler = (pageNumber: number) => {
    const fromElement = numberOfElementsPerPage * (pageNumber - 1);
    const toElement = numberOfElementsPerPage * pageNumber;
    setRowsContentArray(
      contentArray.filter((el, i) => i >= fromElement && i < toElement)
    );
  };

  const handleCreateAccount = () => {};

  return (
    <div>
      <Card width={90} padding={"1rem"}>
        <div className={classes.startupListUpperWrapper}>
          <div style={{ width: "100%", margin: "auto" }}>
            <CustomButton
              clickHandler={() => handleCreateAccount()}
              text={"Crear Cuenta"}
              padding={"15px"}
              width={"150px"}
              fontSize={"15px"}
            />
          </div>
          <div style={{ width: "100%", textAlign: "center", margin: "auto" }}>
            <p className={classes.title}>Listado de Startups</p>
          </div>
          <div style={{ width: "100%", margin: "auto" }}>
            <InputCustomField
              text={"Buscar cuenta"}
              placeholder={"Introduzca un nombre"}
			  width={"100%"}
            />
          </div>
        </div>
      </Card>
      <Card width={90} padding={"0rem"}>
        <div>
          <table>
            <thead>
              <StartupTableHeadRow />
            </thead>
            <tbody>
              {rowsContentArray.map((content) => (
                <StartupTableBodyRow key={content.id} cellsContent={content} />
              ))}
            </tbody>
          </table>
          <div className={classes.buttonsWrapper}>
            <p style={{ color: "#fff", marginRight: "8px" }}>Page Navigation</p>
            {numberOfPageButtons}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StartupTable;
