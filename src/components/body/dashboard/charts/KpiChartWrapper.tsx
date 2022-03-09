import { Grid } from "@mui/material";
import React, { createContext, useState } from "react";
import Card from "../../../../hoc/Card";
import { ElementsToChar, ElementsToCharData } from "../../../../types/types";
import { Kpi } from "../../../../types/Kpi";
import CustomSelectComp from "./CustomSelect";
import classes from "./KpiChartWrapper.module.css";
import KpiChartLogicHandler from "./KpiChartLogicHandler";
import ChartTypes from "./ChartTypes";

interface KpiLineChartWrapperProps {
  kpi: Kpi;
  chartType: ChartTypes;
}

const kpiChartLogicHandler: KpiChartLogicHandler =
  KpiChartLogicHandler.getInstance();

export const KpiChartWrapperContext = createContext<any>(null);

const KpiLineChartWrapper = ({ kpi, chartType }: KpiLineChartWrapperProps) => {
  const [kpiToChar, setKpiToChar] = useState<Kpi>(
    chartType === ChartTypes.RING
      ? kpiChartLogicHandler.getKpiWhenRadiusPlot(kpi)
      : kpi
  );
  const [selectorLabels, setSelectorLabels] = useState<string[]>(
    kpi?.labels || []
  );
  const [selector1Labels, setSelector1Labels] = useState<string[]>(
    kpi?.labels || []
  );
  const [selector2Labels, setSelector2Labels] = useState<string[]>(
    kpi?.labels || []
  );
  const [elementsToChar, setElementsToChar] = useState<
    ElementsToChar<string, string, ElementsToCharData>
  >(kpiChartLogicHandler.buildElementsToChar(kpiToChar));
  const [iFrom, setIFrom] = useState<number>(0);
  const [iTo, setITo] = useState<number>(kpi?.labels?.length || 0);

  const filterSelector1Items = (selectedEl: string) =>
    setSelector1Labels(
      kpiChartLogicHandler.filterSelector1Items(selectedEl, [...selectorLabels])
    );

  const filterSelector2Items = (selectedEl: string) =>
    setSelector2Labels(
      kpiChartLogicHandler.filterSelector2Items(selectedEl, [...selectorLabels])
    );

  const filterDataFromSelection1 = (selectedEl: string) => {
    const selectedIndex = kpiChartLogicHandler.findIndexOfElement(selectedEl, [
      ...selectorLabels,
    ]);
    setIFrom(selectedIndex);
    setElementsToChar(
      kpiChartLogicHandler.filterDataInChart(selectedIndex, iTo, {
        ...kpiToChar,
      })
    );
  };

  const filterDataFromSelection2 = (selectedEl: string) => {
    const selectedIndex = kpiChartLogicHandler.findIndexOfElement(selectedEl, [
      ...selectorLabels,
    ]);
    setITo(selectedIndex);
    setElementsToChar(
      kpiChartLogicHandler.filterDataInChart(iFrom, selectedIndex, {
        ...kpiToChar,
      })
    );
  };

  const selector1ClickHandler = (selectedEl: string): void => {
    filterSelector2Items(selectedEl);
    filterDataFromSelection1(selectedEl);
  };

  const selector2ClickHandler = (selectedEl: string): void => {
    filterSelector1Items(selectedEl);
    filterDataFromSelection2(selectedEl);
  };

  return (
    <Grid item md={6}>
      <Card width={95} padding={"5px"}>
        <div>
          <div className={classes.chartFilterWrapper}>
            <div className={classes.selectorLabel}>
              <label>De: </label>
            </div>
            <CustomSelectComp
              items={selector1Labels}
              clickHandler={(el: string) => selector1ClickHandler(el)}
            />
            <div className={classes.selectorLabel}>
              <label>Hasta: </label>
            </div>
            <CustomSelectComp
              items={selector2Labels}
              clickHandler={(el: string) => selector2ClickHandler(el)}
            />
          </div>
          <KpiChartWrapperContext.Provider value={elementsToChar}>
            {kpiChartLogicHandler.getChartToPlot(chartType)}
          </KpiChartWrapperContext.Provider>
        </div>
      </Card>
    </Grid>
  );
};

export default KpiLineChartWrapper;
