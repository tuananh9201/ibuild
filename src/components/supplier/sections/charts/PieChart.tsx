import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useState } from "react";

const PieChart = () => {
  const [optionsChart, setOptionsChart] = useState({
    chart: {
      type: "pie",
      backgroundColor: "#F8F9FF",
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        innerSize: "50%",
        data: [
          {
            name: "Chrome",
            y: 74.77,
          },
          {
            name: "Edge",
            y: 12.82,
          },
          {
            name: "Firefox",
            y: 4.63,
          },
          {
            name: "Safari",
            y: 2.44,
          },
          {
            name: "Internet Explorer",
            y: 2.02,
          },
          {
            name: "Other",
            y: 3.28,
          },
        ],
      },
    ],
    colors: ["#2D9CDB", "#F8961E", "#F9C74F", "#90BE6D", "#F3722C", "#F94144"],
    credits: {
      enabled: false,
    },
  });

  return (
    <div className="px-7 py-6 bg-[#F8F9FF] rounded-lg">
      <h2 className="text-text-color font-normal text-xl text-center mb-4">
        Danh mục sản phẩm đang cung cấp
      </h2>
      <HighchartsReact highcharts={Highcharts} options={optionsChart} />
    </div>
  );
};

export default PieChart;
