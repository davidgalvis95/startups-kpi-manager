import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { sampleDataSet } from "../../../../assets/sample-data/BarLineChartDataset";
import ColorSelection from "./ColorSelection";

const KpiRingChart = React.memo(() => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const addCustomLabel = (context) => {
    const concept = sampleDataSet.attributes[0].labels[context.dataIndex];
    const sumOfValues = sampleDataSet.attributes[0].values.reduce((partialSum, a) => partialSum + a, 0);
    const participationPercentage = context.parsed/sumOfValues;
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
        sampleDataSet.und + 
        " (" + Math.ceil(participationPercentage*100) + "%)";
    }
    return label;
  };

  const getColor = () => {
    return ColorSelection.getInstance().selectColor("ring");
  };

  const generateDataSets = () => {

    const options = {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: addCustomLabel,
            }
        }
        ,
        legend: {
            display: false,
            position: 'left'
         },
         title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked",
          color: "#8395a7"
        },
      }
    }

    return (
      <Doughnut

      options={options}
        data={{
            title:"fdsfdgdfghgfh",
          labels: sampleDataSet.attributes[0].labels,
          datasets: [{
            label: sampleDataSet.attributes[0].attribute,
            data: sampleDataSet.attributes[0].values,
            backgroundColor: sampleDataSet.attributes[0].values.map((value) =>
              getColor()[0]
            ),
            borderWidth: 0,
            // borderColor: sampleDataSet.attributes[0].values.map((value) =>
            //   'white'
            // )
          }],
        }}
      />
    );
  };
  return <div style={{"width": "45%", "margin": "1rem auto"}}>{generateDataSets()}</div>;
});

export default KpiRingChart;
