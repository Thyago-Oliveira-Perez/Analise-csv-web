import React from "react";
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import api from "./Services/Api"

export default function Grafico() {

  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/api/datas/get")
      .then(response => { 
          setData(response.data);
        }).catch((err) => {
        console.error("ops! ocorreu um erro " + err);
      });
  });

  function coletaChavesJsonFile(dias){
    var chavesJson = [];
    var aux;
    for (var i in dias[0]) {
      aux = i.split(" ");
      chavesJson.push(aux[0]);
    }
    return chavesJson;
  }

  function coletaDatas(data, chavesJson){
    var dias = [];
    var i;
    for(i = 0; i < data.length; i++){  
      var dia = data[i][chavesJson[0]].split(" ");
      if(!dias.includes(dia[0])){
        dias.push(dia[0]);
      }
    }
    return dias;
  }

  function coletaValores(data, chavesJson, c) {
    var i = 0;
    var value;
    var values = [];
    for(i = 0; i < data.length; i++){  
      value = data[i][chavesJson[c]];
      var aux0 = value.split(",")
      var aux1 = aux0[0] + "."+ aux0[1]; 
      value = aux1;
      if(!values.includes(parseFloat(value))){
        values.push(parseFloat(value));
      }
    }
    return values;
  }

  var chavesJson = coletaChavesJsonFile(data);
  var dias = coletaDatas(data, chavesJson);
  var valores0 = coletaValores(data, chavesJson, 1);
  var valores1 = coletaValores(data, chavesJson, 2);
  var valores2 = coletaValores(data, chavesJson, 3);
  
  var option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [
      {
        data: dias,
      },
    ],
    yAxis: [
      {},
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: valores0
      },
      {
        type: 'line',
        showSymbol: false,
        data: valores1
      },
      {
        type: 'line',
        showSymbol: false,
        data: valores2
      },
    ],
  };
  
  return(
    <>
      <ReactEcharts option={option} />
    </> 
  );
}