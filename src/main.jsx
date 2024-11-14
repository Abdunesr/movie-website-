import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StarRating from "./StarRating.jsx";

import Starrate from "./mychallenge.jsx";
import Test from "./StarRating.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/*   <StarRating max={10} /> */}
    {/*   <Starrate
      color="red"
      size="23px"
      defaultRating={3}
      message={[
        "Terriable",
        "bad",
        "okay",
        "Good",
        "Amazing",
        "Terriable",
        "bad",
        "okay",
        "Good",
        "Amazing",
      ]} />*/}

    <Test />
  </React.StrictMode>
);
