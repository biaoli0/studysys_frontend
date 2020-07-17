import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/charts";
import { api } from "../../library/axios/Api";

function PieChart(props) {
  const [data, setData] = useState([ {name: "测试基础02", course_count: 2}]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    api.getDashboardPie().then((res) => {
      if (res && res.hasOwnProperty("datas")) {
        console.log(res);
        setData(res.datas);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const config = {
    forceFit: true,
    title: {
      visible: true,
      text: "多色饼图",
    },
    // description: {
    //   visible: true,
    // },
    radius: 0.8,
    data: data,
    angleField: "course_count",
    colorField: "name",
    label: {
      visible: true,
      type: "inner",
    },
  };

  return <Pie {...config} />;
}

export default PieChart;
