import { KpiAttribute } from "../../../../types/Kpi";
import { ElementsToChar, ElementsToCharData } from "../../../../types/types";
import { Kpi } from "../../../../types/Kpi";
import KpiBarChart from "./bar-chart/KpiBarChart";
import ChartTypes from "./ChartTypes";
import KpiLineChartWrapper from "./KpiChartWrapper";
import KpiLineChart from "./line-chart/KpiLineChart";
import KpiRingChart from "./ring-chart/KpiRingChart";
import KpiStackedBarChart from "./stacked-bar-chart/KpiStackedBarChart";

class KpiChartLogicHandler {


  private static charts: Map<string, JSX.Element> = new Map<
    ChartTypes,
    JSX.Element
  >();
  private static instance: KpiChartLogicHandler;
  member: number;

  constructor() {
    if (KpiChartLogicHandler.instance) {
      throw new Error("Error - use Singleton.getInstance()");
    }
    this.member = 0;
    KpiChartLogicHandler.charts.set(ChartTypes.BAR, <KpiBarChart />);
    KpiChartLogicHandler.charts.set(ChartTypes.LINE, <KpiLineChart />);
    KpiChartLogicHandler.charts.set(
      ChartTypes.STACKED_BAR,
      <KpiStackedBarChart />
    );
    KpiChartLogicHandler.charts.set(ChartTypes.RING, <KpiRingChart />);
  }

  static getInstance(): KpiChartLogicHandler {
    KpiChartLogicHandler.instance =
      KpiChartLogicHandler.instance || new KpiChartLogicHandler();
    return KpiChartLogicHandler.instance;
  }

  drawChartsFromChartTypesArray(chartTypes: string[], kpi: Kpi): JSX.Element[] {
    return chartTypes.map((chartType: string): JSX.Element => {
      return (
        <KpiLineChartWrapper
          key={chartType}
          kpi={kpi}
          chartType={chartType as ChartTypes}
        />
      );
    });
  }

  getChartToPlot(chartType: ChartTypes): JSX.Element {
    return KpiChartLogicHandler.charts.get(chartType)!;
  }

  getKpiWhenRadiusPlot(kpi: Kpi): Kpi {
    return { ...kpi, attributes: [] };
  }

  buildElementsToChar(
    kpi: Kpi
  ): ElementsToChar<string, string, ElementsToCharData> {
    let elementToChar: ElementsToChar<string, string, ElementsToCharData>;
    if (kpi?.attributes?.length === 0) {
      elementToChar = {
        labels: kpi?.labels,
        und: kpi?.und,
        data: [{ name: kpi?.name, values: kpi?.total }],
      };
    } else {
      elementToChar = {
        labels: kpi?.labels,
        und: kpi?.und,
        data: kpi?.attributes.map((attribute: KpiAttribute) => {
          return { name: attribute?.name, values: attribute?.values };
        }),
      };
    }
    return elementToChar;
  }

  filterDataInChart(
    fromIndex: number,
    toIndex: number,
    kpiToFilter: Kpi
  ): ElementsToChar<string, string, ElementsToCharData> {
    const newKpi: Kpi = {
      ...kpiToFilter,
      total: kpiToFilter?.total?.slice(fromIndex, toIndex + 1),
      labels: kpiToFilter?.labels?.slice(fromIndex, toIndex + 1),
      attributes: kpiToFilter?.attributes?.map((a: KpiAttribute) => {
        return {
          ...a,
          values: a.values.slice(fromIndex, toIndex + 1),
        };
      }),
    };
    return this.buildElementsToChar(newKpi);
  }

  findIndexOfElement(selectedEl: string, selectorLabels: string[]): number {
    return [...selectorLabels].indexOf(selectedEl);
  }

  filterSelector1Items(selectedEl: string, selectorLabels: string[]): string[] {
    return [...selectorLabels].filter(
      (label: string, index: number) =>
        index <= this.findIndexOfElement(selectedEl, selectorLabels)
    );
  }

  filterSelector2Items(selectedEl: string, selectorLabels: string[]): string[] {
    return [...selectorLabels].filter(
      (label: string, index: number) =>
        index >= this.findIndexOfElement(selectedEl, selectorLabels)
    );
  }

  createFromIndexToIndexMapper(
    oldDateLabels: string[],
    newDateSortedLabels: string[]
  ): Map<number, number> {
    const mapper = new Map<number, number>();
    oldDateLabels.forEach((label, index) => {
      mapper.set(index, newDateSortedLabels.indexOf(label));
    });
    return mapper;
  }

  orderTheValuesAccordingToMapper(
    mapper: Map<number, number>,
    unsortedValues: number[]
  ): number[] {
    const sortedValues: number[] = Array(unsortedValues.length);
    unsortedValues.forEach((value, index) => {
      sortedValues[mapper.get(index)!] = value;
    });
    return sortedValues;
  }
}

export default KpiChartLogicHandler;
