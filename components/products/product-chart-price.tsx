import { Area } from "@ant-design/plots";
import data from "../../data/product-chart.json";
import { AreaConfig } from "@ant-design/charts";
import { Line } from "@ant-design/plots";
const ProductChartPrice = () => {
  const config: AreaConfig = {
    data,
    xField: "month",
    yField: "value",
    seriesField: "category",
    color: [
      "#6897a7",
      "#8bc0d6",
      "#60d7a7",
      "#dedede",
      "#fedca9",
      "#fab36f",
      "#d96d6f",
    ],
    xAxis: {
      //   type: "time",
      //   mask: "MM",
      label: {
        formatter: (v: string) => `Tháng ${v}`,
      },
    },
    yAxis: {
      label: {
        formatter: (v: string) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };
  return (
    <div className="product-chart">
      <Line style={{ width: "100%" }} {...config} />
    </div>
  );
};

export default ProductChartPrice;
