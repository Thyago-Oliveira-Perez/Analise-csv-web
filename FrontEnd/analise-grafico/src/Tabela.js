import React from "react";
import Api from "./Api";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Tabela(){
    
    var datas = [];
    datas = Api().data;

    function coletaChavesJsonFile(data){
        var chavesJson = [];
        for (var i in data[0]) {
          if (data[0][i] != null) {
              i.split(" ")
              chavesJson.push(i[0]);
          }
        }
        return chavesJson;
    }

    function coletaValores(data, chavesJson, c) {
        var i = 0;
        var values = [];
        for(i = 0; i < data.length; i++){  
          var value = data[i][chavesJson[c]];
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
    const valores0 = coletaValores(datas, chavesJson, 1);
    const valores1 = coletaValores(datas, chavesJson, 2);
    const valores2 = coletaValores(datas, chavesJson, 3);

    function createData(nome, valorMaximo, valorMinimo) {
        return { nome, valorMaximo, valorMinimo};
    }

    const rows = [
        createData(chavesJson[0], Math.max(...valores0), Math.min(...valores0)),
        createData(chavesJson[1], Math.max(...valores1), Math.min(...valores1)),
        createData(chavesJson[2], Math.max(...valores2), Math.min(...valores2)),
    ];

    return (
        <TableContainer>
          <Table sx={{ maxWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>Serie</TableCell>
                <TableCell align="center">Valor Máximo</TableCell>
                <TableCell align="center">Valor Mínimo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.nome}>
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