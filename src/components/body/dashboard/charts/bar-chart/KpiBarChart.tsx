import React, { useContext, useRef } from "react";
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
import { ElementsToChar, ElementsToCharData } from "../../../../../types/types";
import { KpiChartWrapperContext } from "../KpiChartWrapper";

const KpiBarChart = React.memo(() => {

  const { labels, und, data } = useContext<ElementsToChar<string, string, ElementsToCharData>>(KpiChartWrapperContext);
  const chartRef = useRef(null);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

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
      responsive: true,
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
      layout: {
        padding: 25,
      },
      scales: {
        x: {
          grid: {
            color: "#303952",
          },
          ticks: {
            color: "#8395a7",
            fontSize: 12,
          },
        },
        y: {
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
        ref={chartRef}
        options={options}
        data={{
          labels: labels.map((value) => value),
          datasets: data.map((element) => {
            const color = getColor();
            return {
              label: element.name,
              data: element.values,
              // borderColor: color[0],
              backgroundColor: color[1],
              borderWidth: 1.5,
              borderRadius: 3,
              borderSkipped: false,
            };
          }),
        }}
      />
    );
  };

  return <div>{generateDataSets()}</div>;
});

export default KpiBarChart;
