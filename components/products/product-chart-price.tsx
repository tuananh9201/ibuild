import data from "../../data/product-chart.json";
import { AreaConfig } from "@ant-design/plots";
import dynamic from "next/dynamic";
const Area = dynamic(
  () => import("@ant-design/charts").then(({ Area }) => Area),
  {
    ssr: false,
  }
);
const ProductChartPrice = () => {
  const config: AreaConfig = {
    data,
    xField: "month",
    yField: "value",
    seriesField: "category",
    color: ["#366FEB", "#08A822", "#F3960A"],
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
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`) + " vnđ",
      },
    },
    legend: {
      position: "top",
    },
    // smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };
  return (
    <div className="product-chart">
      <Area style={{ width: "100%" }} {...config} />
    </div>
  );
};

export default ProductChartPrice;
