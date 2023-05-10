import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useState } from "react";

const ColumnChart = () => {
  const [optionsChart, setOptionsChart] = useState({
    chart: {
      type: "column",
      style: {
        fontFamily: "Fredoka, sans-serif",
      },
      backgroundColor: "#F8F9FF",
    },
    title: {
      text: null,
    },
    colors: ["#F8961E"],
    xAxis: {
      categories: [
        "Cung cấp công trường",
        "Vật liệu kết cấu xây dựng",
        "Vật liệu hoàn thiện",
        "Hệ thống ống - phụ kiện",
        "Đồ dùng & Đồ đạc",
        "Hệ thống bếp",
        "Cửa - Cửa sổ và phụ kiện",
        "Vật dụng gia đình và đồ làm vuờn",
      ],
      offset: 40,
      labels: {
        // useHTML: true,
        // formatter: function () {
        //   return `<div style="width: 30px; height: 30px">
        //   <img src="https://i.ibb.co/wL2rRhb/australia.png" style="width: 30px; vertical-align: middle" />
        //   </div>`
        // },
        style: {
          color: "#999eb6",
          fontSize: "14px",
          fontWeight: "400",
        },
      },
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        enabled: true,
        formatter: function () {
          return `<span style="color: #999eb6; font-size: 12px; font-weight: 500; line-height: 60px">${(
            (this as any).value as number
          ).toLocaleString()}</span>`;
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        grouping: false,
      },
      series: {
        states: {
          hover: {
            enabled: false,
          },
        },
      },
    },
    series: [
      {
        name: "education",
        colorByPoint: true,
        data: [50000, 50000, 50000, 50000, 50000, 50000, 35000, 12000],
      },
    ],
    credits: {
      enabled: false,
    },
  });
  return (
    <div className="px-7 py-6 bg-[#F8F9FF] rounded-lg">
      <h2 className="text-text-color font-normal text-xl mb-4">
        Nhóm sản phẩm được xem nhiều nhất
      </h2>
      <HighchartsReact highcharts={Highcharts} options={optionsChart} />
    </div>
  );
};

export default ColumnChart;
