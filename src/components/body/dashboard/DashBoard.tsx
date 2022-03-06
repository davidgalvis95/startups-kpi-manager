import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import React from "react";
import Card from "../../../hoc/Card";
import CustomButton from "../../../hoc/CustomButton";
import CustomSelectComp from "./charts/CustomSelect";
import KpiBarChart from "./charts/KpiBarChart";
import KpiLineChart from "./charts/KpiLineChart";
import KpiRingChart from "./charts/KpiRingChart";
import KpiStackedBarChart from "./charts/KpiStackedBarChart";
import KpiLineChartWrapper from "./charts/line-chart/KpiLineChartWrapper";
import classes from "./Dashboard.module.css";
import { sampleDataSet } from "../../../assets/sample-data/BarLineChartDataset";

const Dashboard = () => {
  const importantKpis = [
    {
      name: "Ventas",
      value: 500000,
      und: "USD",
    },
    {
      name: "Ventas Online",
      value: 200000,
      und: "USD",
    },
    {
      name: "Ventas Por Redes Sociales",
      value: 300000,
      und: "USD",
    },
    {
      name: "Margen",
      value: -5000,
      und: "USD",
    },
  ];

  //TODO separate this in another component, This is for filtering
  const handleChange = () => {};

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
        <Grid container>
          {importantKpis.map((kpiInfo, index) => {
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
          })}
        </Grid>
      </div>
      <div className={classes.dashboardChartsWrapper}>
        <Card width={88} padding={"5px"}>
          <div>
            <p className={classes.kpiTitle}>Ventas </p>
            <div></div>
          </div>
        </Card>
        <div className={classes.chartAndSpecificKpiInfoWrapper}>
          <Grid container>
            {/* <Grid item md={6}>
              <Card width={95} padding={"5px"}>
                <div>
                  <KpiRingChart />
                </div>
              </Card>
            </Grid> */}
            <KpiLineChartWrapper kpi={sampleDataSet}/>
          </Grid>
        </div>
        {/* <div className={classes.chartAndSpecificKpiInfoWrapper}>
          <Grid container>
            <Grid item md={6}>
              <Card width={95} padding={"5px"}>
                <div>
                  <div className={classes.chartFilterWrapper}>
                    <CustomSelectComp />
                    <CustomSelectComp />
                  </div>
                  <KpiBarChart />
                </div>
              </Card>
            </Grid>
            <Grid item md={6}>
              <Card width={95} padding={"5px"}>
                <div>
                <div className={classes.chartFilterWrapper}>
                    <CustomSelectComp />
                    <CustomSelectComp />
                  </div>
                  <KpiStackedBarChart />
                </div>
              </Card>
            </Grid>
          </Grid>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
