import React from "react";
import { useLocation } from "react-router-dom";

const Confirmation = (props) => {
  const location = useLocation();
  console.log(location);
  return <div>{location.state.text}</div>;
};

export default Confirmation;
