import { Grid } from "@mui/material";
import React, { useState } from "react";
import Card from "../../../../../hoc/Card";
import { ElementsToChar } from "../../../../../types/types";
import CustomSelectComp from "../CustomSelect";
import KpiLineChart from "../KpiLineChart";
import classes from "./KpiLineChartWrapper.module.css";

interface KpiAttribute {
  attribute: string;
  values: number[];
  labels: string[];
}

interface Kpi {
  name: string;
  und: string;
  labelType: string;
  total: number[];
  labels: string[];
  chartTypes: string[];
  attributesGroupName: string;
  attributes: KpiAttribute[];
}

interface KpiLineChartWrapperProps {
  kpi: Kpi;
}

const buildElementsToChar = (kpi: Kpi): ElementsToChar => {
  let lineChart;
  let elementToChar: ElementsToChar;
  console.log(kpi.attributes.length);
  if (kpi.attributes.length === 0) {
    elementToChar = {
      labels: kpi.labels,
      und: kpi.und,
      data: [{ name: kpi.name, values: kpi.total }],
    };
  } else {
    elementToChar = {
      labels: kpi.labels,
      und: kpi.und,
      data: kpi.attributes.map((attribute) => {
        return { name: attribute.attribute, values: attribute.values };
      }),
    };
  }
  return elementToChar;
};

const KpiLineChartWrapper = ({ kpi }: KpiLineChartWrapperProps) => {
  const [selectorLabels, setSelectorLabels] = useState<string[]>(
    kpi?.labels || []
  );
  const [selector1Labels, setSelector1Labels] = useState<string[]>(
    kpi?.labels || []
  );
  const [selector2Labels, setSelector2Labels] = useState<string[]>(
    kpi?.labels || []
  );
  const [kpiToChar, setKpiToChar] = useState<Kpi>(kpi);
  const [elementsToChar, setElementsToChar] = useState<ElementsToChar>(
    buildElementsToChar(kpi)
  );
  const [iFrom, setIFrom] = useState<number>(0);
  const [iTo, setITo] = useState<number>(kpi?.labels?.length || 0);

  const filterDataInChart = (
    fromIndex: number,
    toIndex: number,
    kpiToFilter: Kpi
  ) => {
    const newKpi: Kpi = {
      ...kpiToFilter,
      total: kpiToFilter?.total?.slice(fromIndex, toIndex + 1),
      labels: kpiToFilter?.labels?.slice(fromIndex, toIndex + 1),
      attributes: kpiToFilter?.attributes?.map((a) => {
        return {
          ...a,
          values: a.values.slice(fromIndex, toIndex + 1),
          labels: a.labels.slice(fromIndex, toIndex + 1),
        };
      }),
    };
    const elementstoChar: ElementsToChar = buildElementsToChar(newKpi);
    setElementsToChar(elementstoChar);
  };

  const findIndexOfElement = (selectedEl: string) =>
    [...selectorLabels].indexOf(selectedEl);

  const filterSelector1Items = (selectedEl: string) => {
    const newLabels: string[] = [...selectorLabels].filter(
      (label: string, index: number) => index <= findIndexOfElement(selectedEl)
    );
    setSelector1Labels(newLabels);
  };

  const filterSelector2Items = (selectedEl: string) => {
    const newLabels: string[] = [...selectorLabels].filter(
      (label: string, index: number) => index >= findIndexOfElement(selectedEl)
    );
    setSelector2Labels(newLabels);
  };

  const filterDataFromSelection1 = (selectedEl: string) => {
    const selectedIndex = findIndexOfElement(selectedEl);
    setIFrom(selectedIndex);
    filterDataInChart(selectedIndex, iTo, { ...kpiToChar });
  };

  const filterDataFromSelection2 = (selectedEl: string) => {
    const selectedIndex = findIndexOfElement(selectedEl);
    setITo(selectedIndex);
    filterDataInChart(iFrom, selectedIndex, { ...kpiToChar });
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
            <div className={classes.selectorLabel}><label>From: </label></div>
            <CustomSelectComp
              items={selector1Labels}
              clickHandler={(el: string) => selector1ClickHandler(el)}
            />
            <div className={classes.selectorLabel}><label>To: </label></div>
            <CustomSelectComp
              items={selector2Labels}
              clickHandler={(el: string) => selector2ClickHandler(el)}
            />
          </div>
          <KpiLineChart element={elementsToChar} />
        </div>
      </Card>
    </Grid>
  );
};

export default KpiLineChartWrapper;
