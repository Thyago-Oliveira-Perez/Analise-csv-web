import axios from "axios";
import { useEffect, useState } from "react";

export default function Api(){
  
    const api = axios.create({
      baseURL: "https://localhost:44379",
    });

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

    return data;
}