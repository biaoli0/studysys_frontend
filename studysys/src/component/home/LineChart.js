import React, { useEffect, useState } from "react";
import { api } from "../../library/axios/Api";
import { Line } from "@ant-design/charts";
import HomepageWrapper from "../global/HomepageWrapper";

function LineChart(props) {
  const [originData, setOriginData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    api.getDashboardData().then((res) => {
      if (res && res.hasOwnProperty("datas")) {
        console.log(res);
        setOriginData(res.datas);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const config = {
    data: originData,
    title: {
      visible: true,
      text: "折线图",
    },
    xField: "course_date",
    yField: "course_count",
  };


  return <Line {...config} />;
}

export default LineChart;
