import React from "react";
import Grafico from "../Grafico";
import Tabela from "../Tabela";
import "./analise.css"
import { useNavigate } from "react-router-dom";

export default function Analise() {

  let navigate = useNavigate();

  function backHome(){
    navigate("/");
  }

  return(
    <div className="container">
      <div>
        <Grafico/>
      </div>
      <div>
        <Tabela/>
      </div>
        <button type="button" onClick={backHome}>Back</button>
    </div> 
  );
}