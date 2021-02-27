import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";
  
console.log("NAEEM",process.env.REACT_APP_NAME)
ReactDOM.render(
  <>
  <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
  </BrowserRouter>

  </>,
    document.getElementById("root")
)