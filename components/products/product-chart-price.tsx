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
