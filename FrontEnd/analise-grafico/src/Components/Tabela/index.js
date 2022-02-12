import React from "react";
import { useEffect, useState } from "react";
import api from "../../Services/Api"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "./tabela.css"

export default function Tabela(){

    const [datas, setData] = useState([]);

    useEffect(() => {
      api
        .get("/api/Datas/get")
        .then(response => { 
            setData(response.data);
          }).catch((err) => {
          console.error("ops! ocorreu um erro " + err);
        });
    }, []);

    function coletaChavesJsonFile(dias){
      var chavesJson = [];
      for (var i in dias[0]) {
        chavesJson.push(i);
      }
      return chavesJson;
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
        if(!isNaN(value)){
          if(!values.includes(parseFloat(value))){
            values.push(parseFloat(value));
          }
        }
      }
      return values;
    }

    var chavesJson = coletaChavesJsonFile(datas);
    var valores0 = coletaValores(datas, chavesJson, 1);
    var valores1 = coletaValores(datas, chavesJson, 2);
    var valores2 = coletaValores(datas, chavesJson, 3);

    function createData(id, nome, valorMaximo, valorMinimo) {
        return { id, nome, valorMaximo, valorMinimo};
    }

    const rows = [
        createData(1, chavesJson[1], Math.max(...valores0), Math.min(...valores0)),
        createData(2, chavesJson[2], Math.max(...valores1), Math.min(...valores1)),
        createData(3, chavesJson[3], Math.max(...valores2), Math.min(...valores2)),
    ];

    return (
        <TableContainer className="tabela">
          <h1 className="titulo">Tabela de Valores</h1>
          <Table sx={{ maxWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>Serie</TableCell>
                <TableCell>Max Value</TableCell>
                <TableCell>Min Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.nome}
                  </TableCell>
                  <TableCell align="right">{row.valorMaximo}</TableCell>
                  <TableCell align="right">{row.valorMinimo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}