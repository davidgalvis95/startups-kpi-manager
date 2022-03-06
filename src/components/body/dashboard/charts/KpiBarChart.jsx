import React, { useRef } from "react";
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
import ColorSelection from "./ColorSelection";
import { sampleDataSet } from "../../../../assets/sample-data/BarLineChartDataset";

const KpiBarChart = React.memo((props) => {
  const chartRef = useRef(null);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const addCustomLabel = (context) => {
    const date = sampleDataSet.attributes[0].labels[context.dataIndex];
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
        sampleDataSet.und;
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
        type="bar"
        data={{
          labels: sampleDataSet.attributes[0].labels.map((value) => value),
          datasets: sampleDataSet.attributes.map((element) => {
            const color = getColor();
            return {
              label: element.attribute,
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
