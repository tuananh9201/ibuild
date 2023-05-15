import { useLayoutEffect } from "react";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useState } from "react";
import useSWR from "swr";

import { categoriesForSupplier } from "@/lib/api/supplier";
import { IChart } from "@/lib/types";

interface PieChartProps {
  supplierId: string;
}

const PieChart = ({ supplierId }: PieChartProps) => {
  const { data } = useSWR<IChart[] | null>(supplierId, categoriesForSupplier);

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
        data: [{}],
      },
    ],
    colors: ["#2D9CDB", "#F8961E", "#F9C74F", "#90BE6D", "#F3722C", "#F94144"],
    credits: {
      enabled: false,
    },
  });

  useLayoutEffect(() => {
    if (!data) return;

    setOptionsChart((prev) => ({
      ...prev,
      series: [
        {
          ...prev.series[0],
          data: data.map((d) => ({
            name: d.root_name,
            y: d.sum_products,
          })),
        },
      ],
    }));
  }, [data]);

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
