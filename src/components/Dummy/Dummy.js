import React from "react";
import { useHistory } from "react-router";

const Dummy = () => {
  const history = useHistory();
  const handleAdmin = () => {
    history.push("/admin");
  };
  const successStyle = {
    fontSize: "40px",
    color: "goldenrod",
    textAlign: "center",
    marginTop: "20px",
  };
  const buttonStyle = {
    padding: "10px",
    backgroundColor: "tomato",
    border: "0",
    color: "white",
    cursor: "pointer",
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={successStyle}>You have logged in succesfully!!</h1>
      <button onClick={handleAdmin} style={buttonStyle}>
        Admin
      </button>
    </div>
  );
};

export default Dummy;
