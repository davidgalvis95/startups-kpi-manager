import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "../../../hoc/Card";
import CustomButton from "../../../hoc/CustomButton";
import KpiLineChartWrapper from "./charts/KpiChartWrapper";
import classes from "./Dashboard.module.css";
import ChartTypes from "./charts/ChartTypes";
import { ImportantKpi, Kpi } from "../../../types/Kpi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/rootReducer";
import { useNavigate } from "react-router-dom";
import KpiChartLogicHandler from "./charts/KpiChartLogicHandler";
import { sortLabels } from "./DateComparator";

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

const logicHadler: KpiChartLogicHandler = KpiChartLogicHandler.getInstance();

const Dashboard = () => {
  const { kpi, kpis } = useSelector((state: RootState) => state?.kpiReducer);
  const [importantKpis, setImportantKpis] = useState<ImportantKpi[]>([]);
  const [kpisDetails, setKpisDetails] = useState<Kpi[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (kpis && kpis.allKpisDetailed) {
      const newKpis = { ...kpis }?.allKpisDetailed?.map((kpi) => {
        const oldLabels = [...kpi.labels];
        const sortedLabels: string[] = sortLabels({...kpi}.labels);
        // console.log(oldLabels)
        const newAttributesWithSortedValues = {...kpi}.attributes.map(
          (attribute, index) => {
            const mapper: Map<number, number> =
              logicHadler.createFromIndexToIndexMapper(
                oldLabels,
                sortedLabels
              );
            const orderedValues: number[] =
              logicHadler.orderTheValuesAccordingToMapper(
                mapper,
                {...attribute}.values
              );
            return { ...attribute, values: orderedValues };
          }
        );
        return {
          ...kpi,
          labels: sortedLabels,
          attributes: newAttributesWithSortedValues,
        };
      });
      setKpisDetails(newKpis);
    }
  }, [kpis?.importantKpis, kpis]);

  useEffect(() => {
    setImportantKpis(kpis?.importantKpis || []);
  }, [kpis?.allKpisDetailed, kpis]);

  // const importantKpis: ImportantKpi[] = sampleDataSet.importantKpis;
  // const kpis: Kpi[] = sampleDataSet.allKpisDetailed;
  //TODO use reducer to get data from company

  const createKpiHandler = () => {
    navigate("/cube/platform/new-kpi");
  };

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
        {drawKpisAsCharts(kpisDetails)}
      </div>
    </div>
  );
};

export default Dashboard;
