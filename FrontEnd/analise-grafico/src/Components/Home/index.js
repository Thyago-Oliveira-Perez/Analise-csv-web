import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function Home() {

  const [arquivo, setArquivo] = useState();

  let navigate = useNavigate();

  function analisePage(){
    navigate("/Analise");
  }

  function enviarDados() {

    var formData = new FormData();
    formData.append("file", arquivo);

    axios({
      method: "post",
      url: "https://localhost:44379/api/datas/post",
      data: formData,
      headers: { "Content-Type": "Content-Type: multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });

      analisePage();

  }
  

  return(
    <>
      <div className="container">
        <input type="file" accept=".csv" onChange={(e) => setArquivo(e.target.files[0])}></input>
        <button type="button" onClick={enviarDados}>Send</button>
      </div>
    </> 
  );
}