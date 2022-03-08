import React, { useEffect, useState } from "react";
import "./StartupTable.module.css";
import Card from "../../../hoc/Card";
import { StartUpBodyRowContent } from "../../../types/types";
import StartupTableBodyRow from "./StartupTableBodyRow";
import StartupTableHeadRow from "./StartupTableHeadRow";
import classes from "./StartupTable.module.css";
import CustomButton from "../../../hoc/CustomButton";
import { range } from "../../../util/RangeGenerator";
import CustomInputComp from "../../../hoc/custom-input/CustomInputComp";
import { RootState } from "../../../store/reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";

interface StartupTableProps {
  displayContentArray: StartUpBodyRowContent[];
}

const numberOfElementsPerPage: number = 13;

const StartupTable = ({ displayContentArray }: StartupTableProps) => {
  const [contentArray, setContentArray] = useState<StartUpBodyRowContent[]>(displayContentArray);
  const [numberOfPageButtons, setNumberOfPageButtons] =
    useState<JSX.Element[]>();
  const [rowsContentArray, setRowsContentArray] = useState<
    StartUpBodyRowContent[]
  >(contentArray.filter((el, i) => i < numberOfElementsPerPage));
  const [seeKpis, setSeeKpis] = useState<boolean>(false);
  // const {kpisData, isLoading} = useSelector((state: RootState) => state?.sideNavBarStatusReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setSeeKpis(false);
  },[]);

  useEffect(() => {
    pages();
    switchPageHandler(1);
  }, [contentArray.length]);

  const pages = ():void => {
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

  const switchPageHandler = (pageNumber: number):void => {
    const fromElement = numberOfElementsPerPage * (pageNumber - 1);
    const toElement = numberOfElementsPerPage * pageNumber;
    setRowsContentArray(
      contentArray.filter((el, i) => i >= fromElement && i < toElement)
    );
  };

  const handleFilterContent = (e:any) => {
    const newArray: StartUpBodyRowContent[]= [...displayContentArray].filter(c=>c.name.toLowerCase().includes(`${e.target.value.toLowerCase()}`));
    setContentArray(newArray);
  }

  const handleCreateAccount = () => {};


  const handleClickToViewKpis = (id:string) => {
    //Send a request to get the KPIs from DB
    // dispatch(allActions.sendSetSideBarStatus.sendSetSideBarStatus({type:isOpen ? "COLLAPSE" : "OPEN"}));
    setSeeKpis(true);
  }
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
            <div className={classes.searchWrapper}>
              <CustomInputComp
                // value={attribute.name}
                label={`Buscar Cuenta`}
                placeholder={"Valor del atributo en el periodo"}
                change={handleFilterContent}
                valueNotReferencedFromParent={true}
              />
            </div>
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
                <StartupTableBodyRow key={content.id} cellsContent={content} click={(id:string) => handleClickToViewKpis(id)}/>
              ))}
            </tbody>
          </table>
          {contentArray.length?<div className={classes.buttonsWrapper}>
            <p style={{ color: "#fff", marginRight: "8px" }}>Page Navigation</p>
            {numberOfPageButtons}
          </div>:null}
        </div>
      </Card>
    </div>
  );
};

export default StartupTable;
