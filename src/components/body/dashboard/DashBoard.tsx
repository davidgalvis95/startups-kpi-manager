import { Grid } from "@mui/material";
import React from "react";
import Card from "../../../hoc/Card";
import CustomButton from "../../../hoc/CustomButton";
import KpiLineChartWrapper from "./charts/KpiChartWrapper";
import classes from "./Dashboard.module.css";
import { sampleDataSet } from "../../../assets/sample-data/BarLineChartDataset";
import ChartTypes from "./charts/ChartTypes";
import { ImportantKpi, Kpi } from "../../../types/types";

const drawKpiChartsWrapper = (
  chartTypes: string[],
  kpi: Kpi
): JSX.Element[] => {
  return chartTypes.map((chartType: string): JSX.Element => {
    return (
      <KpiLineChartWrapper
        key={chartType}
        kpi={kpi}
        chartType={chartType as ChartTypes}
      />
    );
  });
};

const drawKpisAsCharts = (kpis: Kpi[]): JSX.Element[] => {
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

const Dashboard = () => {
  const importantKpis: ImportantKpi[] = sampleDataSet.importantKpis;
  const kpis: Kpi[] = sampleDataSet.allKpisDetailed;
  //TODO use reducer to get data from company

  const createKpiHandler = () => {};

  return (
    <div>
      <div className={classes.dashboardGeneral}>
        {/* TODO add this dinamically */}
        <p className={classes.dashboardNameTitle}>
          DASHBOARD: CUBE VENTURES S.A.S
        </p>
        <div className={classes.buttonWrapper}>
          <CustomButton
            clickHandler={() => createKpiHandler()}
            text={"Crear KPI"}
            padding={"8px"}
            width={"120px"}
            fontSize={"16px"}
          />
        </div>
      </div>
      <div className={classes.generalKpiInfoWrapper}>
        <Grid container>{drawImportantKpis(importantKpis)}</Grid>
      </div>
      <div className={classes.dashboardChartsWrapper}>
        {drawKpisAsCharts(kpis)}
      </div>
    </div>
  );
};

export default Dashboard;
