import style from "@/styles/modules/supplier.module.scss";
import { BarConfig } from "@ant-design/plots";
import dynamic from "next/dynamic";
const Column = dynamic(
  () => import("@ant-design/charts").then(({ Column }) => Column),
  {
    ssr: false,
  }
);
const data = [
  {
    label: "thiết bị vệ sinh.",
    type: "24giờ",
    value: 2800,
  },
  {
    label: "thiết bị âm thanh",
    type: "24giờ",
    value: 2260,
  },
  {
    label: "Thiết bị điều hòa.",
    type: "24giờ",
    value: 1800,
  },
  {
    label: "thiết bị vệ sinh.",
    type: "7 ngày",
    value: 2200,
  },
  {
    label: "thiết bị âm thanh",
    type: "7 ngày",
    value: 2860,
  },
  {
    label: "Thiết bị điều hòa.",
    type: "7 ngày",
    value: 3800,
  },
  {
    label: "thiết bị vệ sinh.",
    type: "1 Tháng",
    value: 4100,
  },
  {
    label: "thiết bị âm thanh",
    type: "1 Tháng",
    value: 5260,
  },
  {
    label: "Thiết bị điều hòa.",
    type: "1 Tháng",
    value: 5800,
  },
];
const config: BarConfig = {
  data,
  isGroup: true,
  xField: "label",
  yField: "value",
  color: ["#F8961E", "#2D9CDB", "#90BE6D"],
  seriesField: "type",
  marginRatio: 0,
  label: {
    // 可手动配置 label 数据标签位置
    position: "middle",
    // 'left', 'middle', 'right'
    // 可配置附加的布局方法
    layout: [
      // 柱形图数据标签位置自动调整
      {
        type: "interval-adjust-position",
      }, // 数据标签防遮挡
      {
        type: "interval-hide-overlap",
      }, // 数据标签文颜色自动调整
      {
        type: "adjust-color",
      },
    ],
  },
};
const SupplierTopViewChart = () => {
  return (
    <div className={style.supplierTopViewChart}>
      <div className={style.supplierTopViewChartBar}>
        <div className={style.supplierTopViewChartBarTitle}>
          <span>Nhóm sản phẩm được xem nhiều nhất</span>
        </div>
        <div className={style.pie}>
          <Column {...config} />
        </div>
      </div>
      <div className={style.chartBar}></div>
    </div>
  );
};

export default SupplierTopViewChart;
