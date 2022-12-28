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
  //   appendPadding: 24,
  //   padding: 36,
  data,
  angleField: "value",
  colorField: "color",
  radius: 1,
  innerRadius: 0.6,
  label: {
    type: "inner",
    offset: "-50%",
    content: "{value}",
    style: {
      textAlign: "center",
      fontSize: 14,
    },
  },
  interactions: [
    {
      type: "element-selected",
    },
    {
      type: "element-active",
    },
  ],
  statistic: {
    content: {
      style: {
        whiteSpace: "pre-wrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      content: "",
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
