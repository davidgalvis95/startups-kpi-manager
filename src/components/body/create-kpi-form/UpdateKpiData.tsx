import { Grid } from "@mui/material";
import Card from "../../../hoc/Card";
import classes from "./CreateNewKpi.module.css";
import CustomInputComp from "../../../hoc/custom-input/CustomInputComp";
import CustomCheckBoxComp from "../../../hoc/checkbox-button/CustomCheckBoxComp";
import AddButtonComp from "../../../hoc/add-button/AddButtonComp";
import React, { useEffect, useState } from "react";
import { Kpi1 } from "../../../types/Kpi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/rootReducer";
import useKpiAxiosNew from "../../../hooks/useKpiAxiosNew";
import {months} from "../dashboard/DateComparator";

const defaultKpis: Kpi1[] = [
  {
    name: "CAC",
    und: "USD",
  },
  {
    name: "Facturacion",
    und: "USD",
  },
  {
    name: "ARR",
    und: "USD",
  },
  {
    name: "EBITDA",
    und: "USD",
  },
  {
    name: "GMV",
    und: "USD",
  },
  {
    name: "Empleados",
    und: "Numero de personas",
  },
  {
    name: "FundRising",
    und: "USD",
  },
  {
    name: "ClientesActivos",
    und: "Numero de personas",
  },
];

const UpdateKpiData = (props: any) => {
  const [kpis, setKpis] = useState<Kpi1[]>(defaultKpis);

  const { user } = useSelector((state: RootState) => state?.userReducer);

  const { kpiOperationLoading } = useSelector(
    (state: RootState) => state?.kpiReducerNew
  );

  const { createOrUpdateKpisDataPointer, startKpiOperationPointer } =
    useKpiAxiosNew();

  const saveData = () => {
    console.log(kpis);
    createOrUpdateKpisDataPointer({ kpis: kpis }, user!.pymeId);
    startKpiOperationPointer();
  };

  const changeValueUndHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    name: string,
    und: string
  ) => {
    const now: Date = new Date();

    const newKpi: Kpi1 = {
      name: name,
      und: und,
      value: parseInt(e.target.value),
      date: months[now.getMonth()] + "-" + now.getUTCFullYear(),
    };
    const newKpis = [...kpis];
    newKpis[index] = newKpi;
    setKpis(newKpis);
  };

  const changeAttributeChartsHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    chartName: string,
    checked: boolean
  ) => {
    const kpisToUpdate = [...kpis];
    if (checked) {
      const kpiToModify = [...kpis][index];
      const chartTypes: string[] = { ...kpiToModify }.chartTypes || [];
      if (chartTypes.indexOf(chartName) === -1) {
        chartTypes.push(chartName);
        const newKpi = {
          ...kpiToModify,
          chartTypes: chartTypes,
        };
        kpisToUpdate[index] = newKpi;
        setKpis(kpisToUpdate);
      }
    } else {
      const kpiToModify = [...kpis][index];
      const chartTypes: string[] = { ...kpiToModify }.chartTypes!.filter(
        (chartType: string) => chartType !== chartName
      );
      const newKpi = {
        ...kpiToModify,
        chartTypes: chartTypes,
      };
      kpisToUpdate[index] = newKpi;
      setKpis(kpisToUpdate);
    }
  };

  const checkKpisHandler = (index: number, chartName: string) => {
    if (kpis[index].chartTypes?.indexOf(chartName) !== undefined) {
      return kpis[index].chartTypes!.indexOf(chartName) >= 0;
    }
    return false;
  };

  return (
    <div className={classes.updateKpisChartsWrapper}>
      <Card width={90} padding={"1rem"}>
        <React.Fragment>
          <div className={classes.title}>
            <p>Creacion del KPI</p>
          </div>
          {/* <FormControl> */}
          {kpis.map((kpi: Kpi1, index: number) => {
            return (
              <Grid key={index} container>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomInputComp label={"Nombre del Kpi"} value={kpi.name} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomInputComp
                    label={"Unidad de medicion"}
                    value={kpi.und}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomInputComp
                    label={"Valor"}
                    placeholder={"Valor"}
                    change={(e: any) =>
                      changeValueUndHandler(e, index, kpi.name, kpi.und)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <p className={classes.textBoxLabel}>
                    {`Seleccione el de graficos que quiere para el kpi ${kpi.name} *`}
                  </p>
                  <div className={classes.chackBoxWrapperParent}>
                    <CustomCheckBoxComp
                      labelBefore={false}
                      name={"Barras"}
                      renderFromParent={true}
                      checked={checkKpisHandler(index, "Barras")}
                      click={(e: any, name: string, checked: boolean) =>
                        changeAttributeChartsHandler(e, index, name, checked)
                      }
                    />
                    <CustomCheckBoxComp
                      labelBefore={false}
                      name={"Barras Agrupadas"}
                      renderFromParent={true}
                      checked={checkKpisHandler(index, "Barras Agrupadas")}
                      click={(e: any, name: string, checked: boolean) =>
                        changeAttributeChartsHandler(e, index, name, checked)
                      }
                    />
                    <CustomCheckBoxComp
                      labelBefore={false}
                      name={"Anillo"}
                      renderFromParent={true}
                      checked={checkKpisHandler(index, "Anillo")}
                      click={(e: any, name: string, checked: boolean) =>
                        changeAttributeChartsHandler(e, index, name, checked)
                      }
                    />
                    <CustomCheckBoxComp
                      labelBefore={false}
                      name={"Linea"}
                      renderFromParent={true}
                      checked={checkKpisHandler(index, "Linea")}
                      click={(e: any, name: string, checked: boolean) =>
                        changeAttributeChartsHandler(e, index, name, checked)
                      }
                    />
                  </div>
                </Grid>
              </Grid>
            );
          })}
          <div className={classes.saveButtonWrapper}>
            {kpiOperationLoading ? (
              <div className={classes.ldsSpinnerSmall}></div>
            ) : (
              <AddButtonComp name={"Guardar Datos"} click={saveData} />
            )}
          </div>
          {/* </FormControl> */}
        </React.Fragment>
      </Card>
    </div>
  );
};

export default UpdateKpiData;
