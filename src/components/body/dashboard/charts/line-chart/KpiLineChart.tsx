import React, { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ColorSelection from "../ColorSelection";
import { ElementsToChar, ElementsToCharData } from "../../../../../types/types";
import { KpiChartWrapperContext } from "../KpiChartWrapperNew";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


//TODO tipify those props
const KpiLineChart = React.memo(() => {

  const { labels, und, data } = useContext<ElementsToChar<string, string, ElementsToCharData>>(KpiChartWrapperContext)

  const addCustomLabel = (context:any) => {
    const date = labels[context.dataIndex];
    let label = context.dataset.label || "";

    if (label) {
      label =
        // label.split(/\s+/)[0] +
        label+
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
    return ColorSelection.getInstance().selectColor("line");
  };

  const generateDataSets = () => {
    const options:any = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: addCustomLabel,
          },
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked",
          color: "#8395a7"
        },
        legend: {
          position: "top",
          labels: {
            color: "#8395a7",
          },
        },
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
      <Line
        options={options}
        data={{
          labels: labels.map((value) => value),
          datasets: data.map((e) => {
            const color = getColor();
            return {
              label: e.name,
              data: e.values,
              borderColor: color[0],
              backgroundColor: color[1],
              borderWidth: 1.5,
            };
          }),
        }}
      />
    );
  };

  return <div>{generateDataSets()}</div>;
});

export default KpiLineChart;
