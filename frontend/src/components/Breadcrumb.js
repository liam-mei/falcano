import React, { Component } from "react";
import Flights from "./Flights.js";
import "./Breadcrumbs.css";
import LandingPage from "./LandingPage";

class Breadcrumb extends Component {
  state = {};
  render() {
    return <header className="container">
        <ul className="breadcrumb">
          <li>
            <a class="active" href={"/"}>
              Home
            </a>
          </li>
          <li>
          <a href={" /Flights"}>
            Flights
            </a>
          </li>
        </ul>
        <li style={{ float: "right" }}>
          <a className="active" href={"/"}>
            Sign Out
          </a>
        </li>
      </header>;
    
  }
}

export default Breadcrumb;
