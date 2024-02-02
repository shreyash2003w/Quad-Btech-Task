// src/App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(BASE_URL);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    
    <div className="container mt-5  ">
      <h2 className="mb-5 text-center text-grey">Top Crypto Currencies</h2>
      <table className="table table-responsive table-dark text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Open</th>
            <th>Low</th>
            <th>High</th>
            <th>Last</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.base_unit}</td>
              <td>{item.low.toLocaleString("en-IN", { currency: "INR" })}</td>
              <td>{item.open.toLocaleString("en-IN", { currency: "INR" })}</td>
              <td>{item.high.toLocaleString("en-IN", { currency: "INR" })}</td>
              <td>{item.last.toLocaleString("en-IN", { currency: "INR" })}</td>
              <td>{item.buy.toLocaleString("en-IN", { currency: "INR" })}</td>
              <td>{item.sell.toLocaleString("en-IN", { currency: "INR" })}</td>
              <td>{item.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
