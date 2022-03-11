import { Grid } from "@mui/material";
import Card from "../../../hoc/Card";
import classes from "./CreateNewKpi.module.css";
import CustomSelectComp from "../../../hoc/dropdown-form-button/CustomSelectComp";
import CustomInputComp from "../../../hoc/custom-input/CustomInputComp";
import CustomCheckBoxComp from "../../../hoc/checkbox-button/CustomCheckBoxComp";
import RemoveButtonComp from "../../../hoc/remove-button/RemoveButtonComp";
import AddButtonComp from "../../../hoc/add-button/AddButtonComp";
import { Kpi, KpiAttribute } from "../../../types/Kpi";
import { useEffect, useState } from "react";
import { newKpiVariablesValues } from "./CreateNewKpi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/rootReducer";
import useKpiAxios from "../../../hooks/useKpiAxios";

interface KpiDataUploadingProps {
  kpis?: Kpi[];
}

const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const setRagneOfYears = (): string[] => {
  const yearsArray = [];
  for (let i: number = 2021; i <= 2040; i++) {
    yearsArray.push(i.toString());
  }
  return yearsArray;
};

const defaultKpi: Kpi = {
  id: "",
  name: "",
  und: "",
  labelType: "",
  total: [],
  labels: [],
  chartTypes: [],
  attributesGroupName: "",
  attributes: [],
  mainKpi: false,
};

const KpiDataUploading = () => {
  const { kpis } = useSelector((state: RootState) => state?.kpiReducer);

  const [indexOfLabelExists, setIndexOfLabelExists] = useState<boolean>(false);
  const [currentKpi, setCurrentKpi] = useState<Kpi>(defaultKpi);
  const [currentYear, setCurrentYear] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [currentVariables, setCurrentVariables] = useState<string[]>([]);
  const [newVariableValue, setNewVariableValue] = useState<string>("");
  const [selectedValueIndex, setSelectedValueIndex] = useState<number>(-1);
  const [kpisForDataUpload, setKpisForDataUpload] = useState<Kpi[]>([
    defaultKpi,
  ]);
  const [years, setYears] = useState<string[]>([]);
  const [kpiLabelsOfDateType, setKpiLabelsOfDateType] = useState<
    boolean | undefined
  >(false);
  const [newVarComparative, setNewVarComparative] = useState<boolean>(false);

  const { kpiOperationLoading } = useSelector(
    (state: RootState) => state?.kpiReducer
  );

  const { user } = useSelector((state: RootState) => state?.userReducer);

  const { updateKpiPointer, startKpiOperationPointer: startOperationPointer } =
    useKpiAxios();

  useEffect(() => {
    setKpisForDataUpload(kpis?.allKpisDetailed || []);
  }, [kpis?.allKpisDetailed, kpis]);

  useEffect(() => {
    const yearsArray: string[] = setRagneOfYears();
    setYears(yearsArray);
  }, []);

  useEffect(() => {
    setKpiLabelsOfDateType(currentKpi.labelType === newKpiVariablesValues[0]);
    setCurrentVariables(currentKpi.labels);
    setSelectedValueIndex(-1);
  }, [currentKpi.name]);

  const saveNewData = (e: any) => {
    let kpiToPersist: Kpi;
    if (!kpiLabelsOfDateType) {
      kpiToPersist = {
        ...currentKpi,
        labels: currentVariables,
        total: recalculateTotals(currentVariables, currentKpi.attributes),
      };
    } else {
      const labelsCopy: string[] = { ...currentKpi }.labels;
      kpiToPersist = {
        ...currentKpi,
        total: recalculateTotals(labelsCopy, currentKpi.attributes),
      };
      // console.log(kpiToPersist);
    }
    //TODO Validate Data
    //TODO send api request to save data
    updateKpiPointer(kpiToPersist, user!.pymeId);
    startOperationPointer();
  };

  const recalculateTotals = (
    labels: string[],
    attributes: KpiAttribute[]
  ): number[] => {
    return labels.map((label, labIndex) => {
      let tolatValueForLabelIndex = 0;
      attributes.forEach(
        (attribute) => tolatValueForLabelIndex += attribute.values[labIndex]
      );
      return tolatValueForLabelIndex;
    });
  };

  const addNewComparativeVariable = (e: any) => {
    const newVars = [...currentVariables];
    newVars[newVars.length - 1] = e.target.value;
    // console.log(newVars);
    setNewVariableValue(e.target.value);
    setCurrentVariables(newVars);
  };

  const newVarComparativeHandler = (e: any) => {
    setNewVarComparative(!newVarComparative);
    if (!e.target.checked) {
      setCurrentVariables(currentKpi.labels);
      setSelectedValueIndex(-1);
    } else {
      const newVars = [...currentVariables];
      newVars.push("");
      setCurrentVariables(newVars);
      const newKpi: Kpi = {
        ...currentKpi,
        attributes: { ...currentKpi }.attributes.map(
          (attribute: KpiAttribute, aIndex: number): KpiAttribute => {
            const val: number[] = { ...attribute }.values;
            val.push(0);
            return {
              ...attribute,
              values: val,
            };
          }
        ),
      };
      console.log(newKpi);
      setCurrentKpi(newKpi);
    }
  };

  const selectVariable = (e: any, index: number) => {
    setSelectedValueIndex(index);
  };

  const setCurrentKpiHandler = (e: any) => {
    setCurrentKpi(
      [...kpisForDataUpload].filter((kpi) => kpi.name === e.target.innerText)[0]
    );
  };

  const createNewLabelIfDoesNotExistonLabelsWhenDates = () => {
    const labelsCopy = { ...currentKpi }.labels;
    const indexOfSelectedDate = labelsCopy.indexOf(
      currentMonth + "-" + currentYear
    );
    if (indexOfSelectedDate === -1) {
      labelsCopy.push(currentMonth + "-" + currentYear);
    }
    setCurrentKpi({ ...currentKpi, labels: labelsCopy });
  };

  const setAttributeValue = (e: any, index: number) => {
    if (currentYear && currentMonth) {
      createNewLabelIfDoesNotExistonLabelsWhenDates();
      const newKpi: Kpi = {
        ...currentKpi,
        attributes: { ...currentKpi }.attributes.map(
          (attribute: KpiAttribute, aIndex: number): KpiAttribute => {
            if (aIndex === index) {
              const val: number[] = { ...attribute }.values;
              const indexOfCurrentVariableLabel = kpiLabelsOfDateType
                ? { ...currentKpi }.labels.indexOf(
                    currentMonth + "-" + currentYear
                  )
                : selectedValueIndex;
              if (indexOfCurrentVariableLabel > val.length - 1) {
                val.push(+e.target.value);
              } else {
                val[indexOfCurrentVariableLabel] = +e.target.value;
              }
              return {
                ...attribute,
                values: val,
              };
            } else {
              return { ...attribute };
            }
          }
        ),
      };
      setCurrentKpi(newKpi);
    }
  };

  const changeMonthHandler = (e: any): void =>
    setCurrentMonth(e.target.textContent);

  const changeYearHandler = (e: any): void =>
    setCurrentYear(e.target.textContent);

  return (
    <div>
      <Card width={90} padding={"1rem"}>
        <div>
          <div className={classes.title}>
            <p>Carga de datos del KPI</p>
          </div>
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <CustomSelectComp
                label={"Seleccione el KPI que desea Actializar *"}
                values={kpisForDataUpload.map((kpi) => kpi.name)}
                click={setCurrentKpiHandler}
              />
            </Grid>
            {!kpiLabelsOfDateType ? (
              <Grid item xs={12} sm={6} md={3}>
                <div
                  className={`${classes.chackBoxWrapperParent} ${classes.margined}`}
                >
                  <CustomCheckBoxComp
                    labelBefore={false}
                    name={"Agregar Nueva Variable Comparativa"}
                    click={newVarComparativeHandler}
                  />
                </div>
              </Grid>
            ) : null}
            {!kpiLabelsOfDateType ? (
              newVarComparative ? (
                <Grid item xs={12} sm={6} md={3}>
                  <CustomInputComp
                    label={"Nombre de la variable comparativa *"}
                    placeholder={"Nombre del KPI"}
                    change={(e: any) => addNewComparativeVariable(e)}
                    value={newVariableValue}
                  />
                </Grid>
              ) : null
            ) : null}
            {!kpiLabelsOfDateType ? (
              <Grid item xs={12} sm={6} md={3}>
                <div>
                  <CustomSelectComp
                    label={
                      "Seleccione variable para el que desea actualizar datos *"
                    }
                    values={currentVariables}
                    click={selectVariable}
                  />
                </div>
              </Grid>
            ) : null}

            {kpiLabelsOfDateType ? (
              <Grid item xs={12} sm={6} md={3}>
                <div>
                  <CustomSelectComp
                    label={
                      "Seleccione mes para el que desea actualizar datos *"
                    }
                    disabled={currentKpi.name === "" ? true : false}
                    values={months}
                    click={changeMonthHandler}
                  />
                </div>
              </Grid>
            ) : null}
            {kpiLabelsOfDateType ? (
              <Grid item xs={12} sm={6} md={3}>
                <div>
                  <CustomSelectComp
                    label={
                      "Seleccione año para el que desea actualizar datos *"
                    }
                    disabled={currentKpi.name === "" ? true : false}
                    values={years}
                    click={changeYearHandler}
                  />
                </div>
              </Grid>
            ) : null}
          </Grid>
          {/* Create attribute component */}
          <div>
            {currentKpi?.attributes?.length ? (
              <div>
                <div className={classes.title}>
                  <p>Valores para los Atributos</p>
                </div>
                <Grid container>
                  {currentKpi.attributes.map((attribute, index) => {
                    //   const value = attribute.values[selectedValueIndex];
                    return (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <CustomInputComp
                            // value={attribute.name}
                            label={`Valor Para el Atributo '${attribute.name}' (${currentKpi.und})*`}
                            placeholder={"Valor del atributo en el periodo"}
                            index={index}
                            change={(el: any) => setAttributeValue(el, index)}
                            valueNotReferencedFromParent={true}
                          />
                          <div className={classes.buttonsWrapper}>
                            <RemoveButtonComp name={"Corregir"} index={index} />
                            {/* <AddButtonComp name={"Guardar"} /> */}
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            ) : null}
          </div>
          {/* Create attribute component */}

          <div className={classes.saveButtonWrapper}>
            {kpiOperationLoading ? (
              <div className={classes.ldsSpinnerSmall}></div>
            ) : (
              <AddButtonComp name={"Guardar Datos"} click={saveNewData} />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default KpiDataUploading;
