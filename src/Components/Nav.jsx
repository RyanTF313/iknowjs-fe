import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
const navStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  backgroundColor: "#518cca",
  color: "white",
  padding: "15px",
  fontSize: "2em",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
};
import { AuthContext } from "../App";

export default function Nav() {
  const { user } = useContext(AuthContext);
  return (
    <div className="nav" style={navStyle}>
      <Link to="/" style={linkStyle}>
        <div>Home</div>
      </Link>
      <Link to="/about" style={linkStyle}>
        <div>About</div>
      </Link>
      <Link to={"/profile/" + user._id} style={linkStyle}>
        <div>Profile</div>
      </Link>
    </div>
  );
}
