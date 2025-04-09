import React, { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
const HomePage = () => {
  useEffect(async () => {
    axiosInstance
      .get("products")
      .then((response) => console.log(response.data));
  });
  return <div>HomePage</div>;
};

export default HomePage;
