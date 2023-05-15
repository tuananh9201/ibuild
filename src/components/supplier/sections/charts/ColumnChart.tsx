import { useState, useEffect, useLayoutEffect } from "react";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import useSWR from "swr";

import { getCategoriesViewer } from "@/lib/api/supplier";
import { IChartParams } from "@/lib/types";
interface ColumnChartProps {
  supplierId: string;
}

type ClickItemProps = {
  id: number;
  content: string;
  isActive: boolean;
  isLoading: boolean;
  onClick: (id: number) => void;
};

const CLICK_ITEMS = [
  {
    id: 7,
    content: "7 ngày trước",
  },
  {
    id: 30,
    content: "30 ngày trước",
  },
  {
    id: 120,
    content: "120 ngày trước",
  },
];

const ClickItem = ({
  id,
  content,
  isActive,
  isLoading,
  onClick,
}: ClickItemProps) => {
  return (
    <li
      className={`flex flex-row items-center gap-2 py-3 px-[10px] ${
        isLoading ? "cursor-none" : "cursor-pointer"
      } ${
        isActive
          ? `bg-primary-color rounded ${isLoading && "opacity-50"}`
          : "bg-inherit"
      }`}
      onClick={() => onClick(id)}
    >
      <div
        className={`w-3 h-3 rounded-full ${isActive ? "bg-white" : "bg-black"}`}
      ></div>
      <span
        className={`${
          isActive ? "text-white" : "text-black"
        } font-medium text-xs`}
      >
        {content}
      </span>
    </li>
  );
};

const ColumnChart = ({ supplierId }: ColumnChartProps) => {
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
      categories: [""],
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
        name: "viewer",
        colorByPoint: true,
        data: [0],
      },
    ],
    credits: {
      enabled: false,
    },
  });
  const [params, setParams] = useState<IChartParams>({
    supplierId: supplierId,
    limit: 7,
    rangeTime: 7,
  });

  const { data, isLoading } = useSWR(params, getCategoriesViewer);

  const handleSelectRange = (id: number) => {
    setParams((prev) => ({
      ...prev,
      rangeTime: id,
    }));
  };

  useLayoutEffect(() => {
    if (!data) return;
    setOptionsChart((prev) => ({
      ...prev,
      xAxis: {
        ...prev.xAxis,
        categories: data.map((d) => d.name_vi),
      },
      series: [
        {
          ...prev.series[0],
          data: data.map((d) => d.count),
        },
      ],
    }));
  }, [data]);

  return (
    <div className="px-7 py-6 bg-[#F8F9FF] rounded-lg relative">
      <h2 className="text-text-color font-normal text-xl mb-4">
        Nhóm sản phẩm được xem nhiều nhất
      </h2>
      <HighchartsReact highcharts={Highcharts} options={optionsChart} />
      <ul className="absolute top-4 right-5 bg-white rounded px-1 py-[2px] flex flex-row">
        {CLICK_ITEMS.map((item) => (
          <ClickItem
            key={item.id}
            id={item.id}
            isLoading={isLoading}
            content={item.content}
            isActive={item.id === params.rangeTime}
            onClick={handleSelectRange}
          />
        ))}
      </ul>
    </div>
  );
};

export default ColumnChart;
