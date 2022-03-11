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
import { useSelector } from "react-redux";
import useKpiAxios from "../../../hooks/useKpiAxios";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../../../util/Encryptor";

interface StartupTableProps {
  displayContentArray: StartUpBodyRowContent[];
}
const defaultPymePhoto = "../../assets/images/factory.jpeg";
const numberOfElementsPerPage: number = 13;

const StartupTable = () => {
  const { pymes } = useSelector((state: RootState) => state?.pymeReducer);
  const { kpis } = useSelector((state: RootState) => state?.kpiReducer);

  const [displayContentArray, setDisplayContentArray] = useState<
    StartUpBodyRowContent[]
  >([]);
  const [contentArray, setContentArray] =
    useState<StartUpBodyRowContent[]>(displayContentArray);
  const [numberOfPageButtons, setNumberOfPageButtons] =
    useState<JSX.Element[]>();
  const [rowsContentArray, setRowsContentArray] = useState<
    StartUpBodyRowContent[]
  >(contentArray.filter((el, i) => i < numberOfElementsPerPage));
  const [seeKpis, setSeeKpis] = useState<boolean>(false);
  const [currentPymeId, setCurrentPymeId] = useState<string>('');

  const { getKpisPointer, startKpiOperationPointer } = useKpiAxios();

  const navigate = useNavigate();

  useEffect(() => {
    setContentArray(displayContentArray)
  }, [displayContentArray])


  useEffect(() => {
    console.log(pymes);
    const newContent: StartUpBodyRowContent[] =
      pymes?.map((pyme): StartUpBodyRowContent => {
        return {
          id: pyme.pymeId,
          photoUrl: pyme.photoUrl || defaultPymePhoto,
          name: pyme.name,
          status: pyme.active.toString(),
          address: pyme.address,
          city: pyme.city,
          //TODO add this date to the pyme object and save this info in the pyme creation account
          affiliationDate: new Date().toISOString(),
        };
      }) || [];

    setDisplayContentArray(newContent);
    // setContentArray()
  }, [pymes]);

  useEffect(() => {
    if(kpis && kpis?.allKpisDetailed && kpis?.importantKpis){
      const dashboardUrl = `/cube/platform/dashboard/${encrypt(currentPymeId)}`;
      navigate(dashboardUrl);
    }
  }, [kpis, kpis?.allKpisDetailed, kpis?.importantKpis])

  useEffect(() => {
    setSeeKpis(false);
  }, []);

  useEffect(() => {
    pages();
    switchPageHandler(1);
  }, [contentArray.length, displayContentArray.length]);

  const pages = (): void => {
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

  const switchPageHandler = (pageNumber: number): void => {
    const fromElement = numberOfElementsPerPage * (pageNumber - 1);
    const toElement = numberOfElementsPerPage * pageNumber;
    setRowsContentArray(
      contentArray.filter((el, i) => i >= fromElement && i < toElement)
    );
  };

  const handleFilterContent = (e: any) => {
    const newArray: StartUpBodyRowContent[] = [...displayContentArray].filter(
      (c) => c.name.toLowerCase().includes(`${e.target.value.toLowerCase()}`)
    );
    setContentArray(newArray);
  };

  const handleCreateAccount = () => {
    navigate("/cube/platform/new-pyme")
  };

  const handleClickToViewKpis = (id: string) => {
    setCurrentPymeId(id);
    startKpiOperationPointer();
    getKpisPointer(id);
    setSeeKpis(true);
  };
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
                <StartupTableBodyRow
                  key={content.id}
                  cellsContent={content}
                  click={(id: string) => handleClickToViewKpis(id)}
                />
              ))}
            </tbody>
          </table>
          {contentArray.length ? (
            <div className={classes.buttonsWrapper}>
              <p style={{ color: "#fff", marginRight: "8px" }}>
                Page Navigation
              </p>
              {numberOfPageButtons}
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
};

export default StartupTable;
