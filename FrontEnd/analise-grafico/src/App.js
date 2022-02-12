import React from "react";
import Analise from "./Components/Analise"
import Home from "./Components/Home"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/Analise" exact element={<Analise />}>     
        </Route>
      </Routes>
    </BrowserRouter>
  );
}