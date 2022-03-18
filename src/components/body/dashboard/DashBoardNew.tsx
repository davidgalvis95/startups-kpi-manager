import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "../../../hoc/Card";
import CustomButton from "../../../hoc/CustomButton";
import classes from "./Dashboard.module.css";
import ChartTypes from "./charts/ChartTypes";
import { ImportantKpi, KpiDataFetching, KpiFetching } from "../../../types/Kpi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/rootReducer";
import { useNavigate } from "react-router-dom";
import { sortValuesArray } from "./DateComparator";
import KpiChartWrapperNew from "./charts/KpiChartWrapperNew";
import Backdrop from "../../../UI/Backdrop";

const drawKpiChartsWrapper = (
  chartTypes: string[],
  kpi: KpiFetching
): JSX.Element[] => {
  return chartTypes.map((chartType: string): JSX.Element => {
    return (
      <KpiChartWrapperNew
        key={chartType}
        kpi={kpi}
        chartType={chartType as ChartTypes}
      />
    );
  });
};

const drawKpisAsCharts = (kpis: KpiFetching[]): JSX.Element[] => {
  if (!kpis) {
    return [];
  }

  return kpis.map((kpi) => {
    return (
      <div key={kpi.name}>
        <Card width={88} padding={"5px"}>
          <div>
            <p className={classes.kpiTitle}>{kpi.name}</p>
          </div>
        </Card>
        <div className={classes.chartAndSpecificKpiInfoWrapper}>
          <Grid container>{drawKpiChartsWrapper(kpi.chartTypes, kpi)}</Grid>
        </div>
      </div>
    );
  });
};

const drawImportantKpis = (kpis: ImportantKpi[]): JSX.Element[] => {
  return kpis.map((kpiInfo: ImportantKpi, index: number): JSX.Element => {
    return (
      <Grid item md={3} key={index}>
        <Card width={95} padding={"5px"}>
          <div className={classes.importantKpiWrapper}>
            <div>
              <label>{kpiInfo.name}</label>
            </div>
            <p
              className={
                kpiInfo.value >= 0
                  ? `${classes.importantKpiValue}  ${classes.positive}`
                  : `${classes.importantKpiValue}  ${classes.negative}`
              }
            >
              {kpiInfo.value} {kpiInfo.und}
            </p>
          </div>
        </Card>
      </Grid>
    );
  });
};

// const logicHadler: KpiChartLogicHandler = KpiChartLogicHandler.getInstance();

const DashboardNew = () => {
  const { kpisFetched, kpiOperationLoading } = useSelector(
    (state: RootState) => state?.kpiReducerNew
  );
  const { user } = useSelector((state: RootState) => state?.userReducer);
  // const kpisFetched = sampleKpisResponse
  const [importantKpis, setImportantKpis] = useState<ImportantKpi[]>([]);
  const [kpisDetails, setKpisDetails] = useState<KpiFetching[]>([]);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(kpisFetched);
    if (kpisFetched) {
      const newKpis = { ...kpisFetched }.kpis?.map((kpi) => {
        const sortedKpiValues: KpiDataFetching[] = sortValuesArray(
          { ...kpi }.values
        );
        return {
          ...kpi,
          values: sortedKpiValues,
        };
      });
      setKpisDetails(newKpis);
    }
  }, [kpisFetched, kpisFetched?.kpis]);

  useEffect(() => {
    if (kpisFetched) {
      //This needs to be calculated based on a month controller
      const importantKpis: ImportantKpi[] = { ...kpisFetched }.kpis
        ?.filter((kpi: KpiFetching) => kpi.important)
        .map((kpi: KpiFetching) => {
          const kpiSumOfvalues: number = kpi.values
            .map((value: KpiDataFetching) => value.value)
            .reduce((prev: number, next: number) => prev + next, 0);
          return {
            id: kpi.id,
            name: kpi.name,
            value: kpiSumOfvalues,
            und: kpi.und === "Numero de personas" ? "" : kpi.und,
          };
        });
      setImportantKpis(importantKpis || []);
    }
  }, [kpisFetched, kpisFetched?.kpis]);

  // const importantKpis: ImportantKpi[] = sampleDataSet.importantKpis;
  // const kpis: Kpi[] = sampleDataSet.allKpisDetailed;
  //TODO use reducer to get data from company

  const createKpiHandler = () => {
    navigate("/cube/platform/create-or-update-kpi");
  };

  return (
    <div>
      {!kpiOperationLoading ? (
        <div>
          <div className={classes.dashboardGeneral}>
            {/* TODO add this dinamically */}
            <p className={classes.dashboardNameTitle}>
              DASHBOARD: CUBE VENTURES S.A.S
            </p>
            {user?.rights === "USER" ? (
              <div className={classes.buttonWrapper}>
                <CustomButton
                  clickHandler={() => createKpiHandler()}
                  text={"Cargar Datos de KPI"}
                  padding={"8px"}
                  width={"200px"}
                  fontSize={"16px"}
                />
              </div>
            ) : null}
          </div>
          <div className={classes.generalKpiInfoWrapper}>
            <Grid container>{drawImportantKpis(importantKpis)}</Grid>
          </div>
          <div className={classes.dashboardChartsWrapper}>
            {drawKpisAsCharts(kpisDetails)}
          </div>
        </div>
      ) : <Backdrop/>}
    </div>
  );
};

export default DashboardNew;
