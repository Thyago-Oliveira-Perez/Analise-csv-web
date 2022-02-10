import React from "react";
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {

  const baseURL = "https://localhost:44379/api/datas/get";

  const [data, setData] = useState([]);

  const pedidoGet=async()=>{
    await axios.get(baseURL)
    .then(response => {
      setData(response.data);
    }).catch(error=>{
      console.error(error);
    })
  }

  useEffect(() => {
    pedidoGet();
  }, []);  

  var chavesJson = [];

  for (var i in data[0]) {
    if (data[0][i] != null) {
        chavesJson.push(i);
    }
  }

  console.log(chavesJson);


  const option = {
      xAxis: { 
        type: 'category',
        axisTick:
        {
          alignWithLabel: true
        },       
         data: ['11/03/2020', '15/03/2020', '18/03/2020', '21/03/2020', '23/03/2020']
        },
      yAxis: {
        type: 'category',
        axisTick:
        {
          alignWithLabel: true
        },
      data: [(-30.00).toFixed(2), (-25.00).toFixed(2), (-20.00).toFixed(2),(-15.00).toFixed(2), 
        (-10.00).toFixed(2), (-5.00).toFixed(2), (0.00).toFixed(2), (5.00).toFixed(2), (10.00).toFixed(2)]
    },
    series: [
      {
        data: ['-5.00', '-5.00','-20.00', '-15.00', '10.00'],
        type: 'line'
      }
    ]
  }; 
  
  return(
    <>
      <ReactEcharts option={option} />;
    </> 
  );
  
}