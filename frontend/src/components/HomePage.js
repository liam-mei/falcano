import React, { Component } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import TopHeader from "./TopHeader";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CardContent from "@material-ui/core/CardContent";
import TabContainer from "./tabs";
import { HorizontalBar } from "react-chartjs-2";

import logo from "../utils/Images/Logo.svg";
import "./HomePage.css";

let URL = process.env.REACT_APP_URL;

const options = {
  scales: {
    xAxes: [
      {
        stacked: true,
        gridLines: { display: false }
      }
    ],
    yAxes: [
      {
        stacked: true,
        gridLines: { display: false }
      }
    ]
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 0,
      bottom: 0
    }
  },
  tooltips: {
    mode: "nearest"
  },
  maintainAspectRatio: true,
  responsive: {
    "height < 428px": {
      legend: {
        display: false
      }
    }
  }
};

// var stackedBar = new Chart({
//   type: "bar",
//   data: data,
//   options: {
//     scales: {
//       xAxes: [
//         {
//           stacked: true
//         }
//       ],
//       yAxes: [
//         {
//           stacked: true
//         }
//       ]
//     }
//   }
// });

let headers;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightList: [],
      sel: 0,
      mel: 0,
      ses: 0,
      mes: 0,
      cross_country_: [],
      no_instument_app: [],
      no_ldg: [],
      day: [],
      night: [],
      actual_instr: [],
      sim_instr: [],
      pic: [],
      dual_rec: [],
      loading: true
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
    axios({
      method: "GET",
      url: `${URL}api/joined/`,
      headers: headers
    })
      .then(response => {
        console.log("HOME RES", response.data);
        this.setState({ flightList: response.data });
      })
      .catch(err => {
        console.log(err);
      })
      .then(res => {
        let cross_country_Arr = Array(4).fill(0),
          no_instrument_app_Arr = Array(4).fill(0),
          no_ldg_Arr = Array(4).fill(0),
          dayArr = Array(4).fill(0),
          nightArr = Array(4).fill(0),
          actualArr = Array(4).fill(0),
          simArr = Array(4).fill(0),
          picArr = Array(4).fill(0),
          recArr = Array(4).fill(0);

        let x = 0;
        let data = this.state.flightList;
        for (var key in data) {
          for (let i = 0; i < data[key].length; i++) {
            // console.log(data[key][i].pic)
            cross_country_Arr[x] += data[key][i].cross_country;
            no_instrument_app_Arr[x] += data[key][i].no_instument_app;
            no_ldg_Arr[x] += data[key][i].no_ldg;
            dayArr[x] += data[key][i].day;
            nightArr[x] += data[key][i].night;
            actualArr[x] += data[key][i].actual_instr;
            simArr[x] += data[key][i].sim_instr;
            picArr[x] += data[key][i].pic;
            recArr[x] += data[key][i].dual_rec;
          }
          x++;
        }
        this.setState({
          day: dayArr,
          night: nightArr,
          actual_instr: actualArr,
          sim_instr: simArr,
          pic: picArr,
          dual_rec: recArr,
          cross_country: cross_country_Arr,
          no_instument_app: no_instrument_app_Arr,
          no_ldg: no_ldg_Arr
        });
      });
  }
  render() {
    let types = ["MES", "MEL", "SEL", "SES"];

    let color1 = "#BBDEFB";
    let color2 = "#90CAF9";
    let color3 = "#64B5F6";
    let color4 = "#42A5F5";
    let color5 = "#2196F3";
    let color6 = "#1E88E5";
    let color7 = "#1976D2";
    let color8 = "#1565C0";
    let color9 = "#0D47A1";

    let hoverColor1 = "#B3E5FC";
    let hoverColor2 = "#81D4FA";
    let hoverColor3 = "#4FC3F7";
    let hoverColor4 = "#29B6F6";
    let hoverColor5 = "#03A9F4";
    let hoverColor6 = "#039BE5";
    let hoverColor7 = "#0288D1";
    let hoverColor8 = "#0277BD";
    let hoverColor9 = "#01579B";

    let data = {
      labels: types,
      datasets: [
        {
          label: "PIC",
          data: this.state.pic,
          backgroundColor: color1,
          hoverBackgroundColor: hoverColor1,
          hoverBorderWidth: 0
        },
        {
          label: "Dual Rec",
          data: this.state.dual_rec,
          backgroundColor: color2,
          hoverBackgroundColor: hoverColor2,
          hoverBorderWidth: 0
        },
        {
          label: "Sim Instr",
          data: this.state.dual_rec,
          backgroundColor: color3,
          hoverBackgroundColor: hoverColor3,
          hoverBorderWidth: 2
        },
        {
          label: "Actual Instr",
          data: this.state.actual_instr,
          backgroundColor: color4,
          hoverBackgroundColor: hoverColor4,
          hoverBorderWidth: 2
        },
        {
          label: "Day",
          data: this.state.day,
          backgroundColor: color5,
          hoverBackgroundColor: hoverColor5,
          hoverBorderWidth: 2
        },
        {
          label: "Night",
          data: this.state.night,
          backgroundColor: color6,
          hoverBackgroundColor: hoverColor6,
          hoverBorderWidth: 2
        },
        {
          label: "Cross Country",
          data: this.state.cross_country,
          backgroundColor: color7,
          hoverBackgroundColor: hoverColor7,
          hoverBorderWidth: 2,
          hidden: true
        },
        {
          label: "No Instrument App",
          data: this.state.no_instument_app,
          backgroundColor: color8,
          hoverBackgroundColor: hoverColor8,
          hoverBorderWidth: 2,
          hidden: true
        },
        {
          label: "No Ldg",
          data: this.state.no_ldg,
          backgroundColor: color9,
          hoverBackgroundColor: hoverColor9,
          hoverBorderWidth: 2,
          hidden: true
        }
      ],
      tooltips: {
        mode: "index",
        backgroundColor: "rgba(255,255,255)",
        borderColor: "rgb(0, 0, 0)",
        borderWidth: 0.3,
        cornerRadius: 0,
        caretSize: 0,
        xPadding: 70,
        yPadding: 25,
        titleFontColor: "rgba(0, 0, 0, 0.87)",
        titleFontSize: 10,
        titleFontFamily: "Roboto",
        bodyFontFamily: "Roboto"
      }
    };
    console.log("HOME STATE", this.state);
    headers = {
      Authorization: "JWT " + localStorage.getItem("token")
    };
    const { loading } = this.state;

    if (loading) {
      return (
        <div className="HomePage">
          <NavBar />
          <TopHeader />
          <div className="HomePage-info-loading">
            <Card
              style={{
                marginTop: "10%",
                maxWidth: "800px",
                height: "600px",
                marginLeft: "15%"
              }}
            >
              <div className="load-bar">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>
              <CardContent />
            </Card>
          </div>
        </div>
      );
    } else {
      return (
        <div className="HomePage">
          <NavBar />
          <TopHeader />
          <div className="HomePage-info">
            {/* <img src={logo } className="Falcano-Logo" alt="logo"/> */}
            <Card className="Homepage-totalscard">
              <h4 style={{ paddingTop: "30px" }}>Your Falcano Hours</h4>
              <HorizontalBar data={data} options={options} />
              {/* <Chart data={data}>
                <Axis primary type="ordinal" position="left" />
                <Axis type="linear" stacked position="bottom" />
                <Series type={Bar} />
                <Cursor primary />
                <Cursor />
                <Tooltip />
            </Chart> */}

              {/* <div className="homepage-license">
                <List className="license-type1">
                  <ListItem>SEL Hours : {this.state.sel}</ListItem>
                  <ListItem className="LicenseType">
                    SES Hours : {this.state.ses}
                  </ListItem>
                </List>
                <List className="license-type2">
                  <ListItem className="LicenseType1">
                    MEL Hours : {this.state.mel}
                  </ListItem>
                  <ListItem className="LicenseType">
                    MES Hours : {this.state.mes}
                  </ListItem>
                </List>
              </div>
              <CardContent />
              <CardContent className="TotalsBodyChildren">
                <div classname="totals-1">
                  <p>Cross Country : {this.state.cross_country}</p>
                  <p>No. Instr. App. : {this.state.no_instument_app}</p>
                  <p>No. Ldg. : {this.state.no_ldg}</p>
                  <p>Day : {this.state.day}</p>
                  <p>Night : {this.state.night}</p>
                </div>
                <div classname="totals-2">
                  <p>Actual : {this.state.actual_instr}</p>
                  <p>SIM : {this.state.sim_instr}</p>
                  <p>Grnd Trnr. :</p>
                  <p>PIC : {this.state.pic}</p>
                  <p>Dual Rec. : {this.state.dual_rec}</p>
                </div>
              </CardContent> */}
            </Card>
          </div>
        </div>
      );
    }
  }
}

export default HomePage;
