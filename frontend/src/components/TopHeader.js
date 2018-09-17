import React, { Component } from "react";
import Flights from "./Flights.js";
import "./TopHeader.css";
import LandingPage from "./LandingPage";
import { Link } from "react-router-dom";

class TopHeader extends Component
{
  state = {};
  render()
  {
    return (
      <div className="TopNav">
        <div className="BreadCrumb">
          <Link className="link" to={"/"}>Home</Link> >
        <Link className="link" to={"/flights"}>Flights</Link>
        </div>

        <div className="ViewTotal">
          <Link className="link" to={"#"}>View Total Hours</Link>
        </div>
      </div>


    );
  }
}

export default TopHeader;
