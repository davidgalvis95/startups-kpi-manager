import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ColorSelection from "../ColorSelection";
import { ElementsToChar, ElementsToCharData } from "../../../../../types/types";
import { KpiChartWrapperContext } from "../KpiChartWrapper";

const KpiRingChart = React.memo(() => {
  const { labels, und, data } = useContext<
    ElementsToChar<string, string, ElementsToCharData>
  >(KpiChartWrapperContext);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const addCustomLabel = (context: any) => {
    const concept = labels[context.dataIndex];
    const sumOfValues = data[0].values.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    const participationPercentage = context.parsed / sumOfValues;
    let label = context.dataset.label || "";

    if (label) {
      label =
        // label.split(/\s+/)[0] +
        label +
        ": " +
        concept +
        " - " +
        context.parsed +
        " " +
        und +
        " (" +
        Math.ceil(participationPercentage * 100) +
        "%)";
    }
    return label;
  };

  const getColor = () => {
    return ColorSelection.getInstance().selectColor("ring");
  };

  const generateDataSets = () => {
    const options: any = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: addCustomLabel,
          },
        },
        legend: {
          display: false,
          position: "left",
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked",
          color: "#8395a7",
        },
      },
    };

    return (
      <Doughnut
        options={options}
        data={{
          labels: labels,
          datasets: [
            {
              label: data[0].name,
              data: data[0].values,
              backgroundColor: data[0].values.map((value) => getColor()[0]),
              borderWidth: 0,
              // borderColor: sampleDataSet.attributes[0].values.map((value) =>
              //   'white'
              // )
            },
          ],
        }}
      />
    );
  };
  return (
    <div style={{ width: "45%", margin: "1rem auto" }}>
      {generateDataSets()}
    </div>
  );
});

export default KpiRingChart;
