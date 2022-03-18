import React, { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ColorSelection from "../ColorSelection";
import { KpiChartWrapperContext } from "../KpiChartWrapperNew";
import { ElementsToChar, ElementsToCharData } from "../../../../../types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const KpiStackedBarChart = React.memo(() => {

  const { labels, und, data } = useContext<ElementsToChar<string, string, ElementsToCharData>>(KpiChartWrapperContext)

  const addCustomLabel = (context:any) => {
    const date = labels[context.dataIndex];
    let label = context.dataset.label || "";

    if (label) {
      label =
        // label.split(/\s+/)[0] +
        label +
        ": " +
        date +
        " - " +
        context.parsed.y +
        " " +
        und;
    }
    return label;
  };

  const getColor = () => {
    return ColorSelection.getInstance().selectColor("bar");
  };

  const generateDataSets = () => {
    const options = {
      plugins: {
        title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked",
          color: "#8395a7"
        },
        legend: {
          labels: {
            color: "#8395a7",
          },
        },
        tooltip: {
          callbacks: {
            label: addCustomLabel,
          },
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
          grid: {
            color: "#303952",
          },
          ticks: {
            color: "#8395a7",
            fontSize: 12,
          },
        },
        y: {
          stacked: true,
          grid: {
            color: "#303952",
          },
          ticks: {
            color: "#8395a7",
            fontSize: 12,
          },
        },
      },
    };

    return (
      <Bar
        options={options}
        data={{
          labels: labels.map((value) => value),
          datasets: data.map((element) => {
            const color = getColor();
            return {
              label: element.name,
              data: element.values,
              backgroundColor: color[0],
            };
          }),
        }}
      />
    );
  };

  return <div>{generateDataSets()}</div>;
});

export default KpiStackedBarChart;
