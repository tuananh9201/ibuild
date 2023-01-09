import style from "@/styles/modules/supplier.module.scss";
import { Pie, PieConfig } from "@ant-design/plots";

const data = [
  {
    type: "Thiết bị vệ sinh",
    value: 27,
    color: "#F94144",
  },
  {
    type: "Thiết bị âm thanh",
    value: 25,
    color: "#F3722C",
  },
  {
    type: "Thiết bị vệ sinh 1",
    value: 18,
    color: "#2D9CDB",
  },
  {
    type: "Thiết bị âm thanh 1",
    value: 15,
    color: "#F8961E",
  },
  {
    type: "Thiết bị điều hòa 1",
    value: 10,
    color: "#F9C74F",
  },
  {
    type: "Thiết bị điều hòa",
    value: 5,
    color: "#90BE6D",
  },
];
const config: PieConfig = {
  // appendPadding: [0, 8, 8, -8],
  padding: [0, 8],
  limitInPlot: true,
  data,
  angleField: "value",
  colorField: "type",
  color: data.map((d) => d.color),
  radius: 1,
  innerRadius: 0.6,
  width: 200,
  height: 200,
  autoFit: true,
  legend: {
    layout: "vertical",
    position: "right",
    flipPage: true,
  },
  label: {
    type: "inner",
    offset: "-50%",
    content: "{value}",
    style: {
      textAlign: "center",
      fontSize: 12,
    },
  },
};
const SupplierChart = () => {
  return (
    <div className={style.chart}>
      <div className={style.cardChartPie}>
        <div className={style.title}>
          <span>Nhóm sản phẩm đang cung cấp của đại lý</span>
        </div>
        <div className={style.pie}>
          <Pie {...config} />
        </div>
      </div>
      <div className={style.chartBar}></div>
    </div>
  );
};

export default SupplierChart;
