import React, { Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import {
  getNbProducts,
  getNbBestProducts,
  getNbCeramicProducts,
  getNbWoodProducts,
  getNbCeramicClassiwProducts,
  getNbWoodClassicProducts,
  getNbCeramicClassicProducts,
  getNbWoodModernProducts,
  getNbWoodWoodProducts,
  getNbCeramicWoodProducts,
  getNbWoodCeramicProducts,
  getNbCeramiCeramicProducts,
} from "../../../../Redux/Actions/ProductAction";
import { getNbclients } from "../../../../Redux/Actions/ClientManagementAction";
import { getNbOrders } from "../../../../Redux/Actions/OrderAction";

class Dashboard extends Component {
  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      visitSaleData: {},
      visitSaleOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                display: false,
                min: 0,
                stepSize: 20,
                max: 80,
              },
              gridLines: {
                drawBorder: false,
                color: "rgba(235,237,242,1)",
                zeroLineColor: "rgba(235,237,242,1)",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false,
                color: "rgba(0,0,0,1)",
                zeroLineColor: "rgba(235,237,242,1)",
              },
              ticks: {
                padding: 20,
                fontColor: "#9c9fa6",
                autoSkip: true,
              },
              categoryPercentage: 0.5,
              barPercentage: 0.5,
            },
          ],
        },
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
      trafficData: {},
      trafficOptions: {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        legend: false,
      },

      inputValue: "5000",
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  inputChangeHandler(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }
  componentDidMount() {
    this.props.getNbProducts();
    this.props.getNbBestProducts();
    this.props.getNbclients();
    this.props.getNbCeramicProducts();
    this.props.getNbWoodProducts();
    this.props.getNbOrders();
    this.props.getNbWoodClassicProducts();
    this.props.getNbCeramicClassicProducts();
    this.props.getNbWoodModernProducts();
    this.props.getNbWoodWoodProducts();
    this.props.getNbCeramicWoodProducts();
    this.props.getNbWoodCeramicProducts();
    this.props.getNbCeramiCeramicProducts();
    this.props.getNbCeramicClassiwProducts();
  }
  componentDidUpdate(previouProps, previousState) {
    var ctx = document.getElementById("visitSaleChart").getContext("2d");

    var gradientdonut1 = ctx.createLinearGradient(0, 0, 0, 181);
    gradientdonut1.addColorStop(0, "rgba(54, 215, 232, 1)");
    gradientdonut1.addColorStop(1, "rgba(177, 148, 250, 1)");

    var gradientdonut2 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientdonut2.addColorStop(0, "rgba(254, 124, 150, 1)");
    gradientdonut2.addColorStop(1, "rgba(255, 205, 150, 1)");

    let trafficData = {
      datasets: [
        {
          data: [this.props.countwoodProducts, this.props.countceramicProducts],
          backgroundColor: [gradientdonut1, gradientdonut2],
          hoverBackgroundColor: [gradientdonut1, gradientdonut2],
          borderColor: [gradientdonut1, gradientdonut2],
          legendColor: [gradientdonut1, gradientdonut2],
        },
      ],

      labels: ["Cadres en bois", "Cadres en céramiques"],
    };

    if (previousState.trafficData === this.state.trafficData) {
      this.setState({
        trafficData,
      });
    }

    var ctx = document.getElementById("visitSaleChart").getContext("2d");
    var gradientBar1 = ctx.createLinearGradient(0, 0, 0, 181);
    gradientBar1.addColorStop(0, "rgba(218, 140, 255, 1)");
    gradientBar1.addColorStop(1, "rgba(154, 85, 255, 1)");

    var gradientBar2 = ctx.createLinearGradient(0, 0, 0, 360);
    gradientBar2.addColorStop(0, "rgba(54, 215, 232, 1)");
    gradientBar2.addColorStop(1, "rgba(177, 148, 250, 1)");

    var gradientBar3 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientBar3.addColorStop(0, "rgba(255, 191, 150, 1)");
    gradientBar3.addColorStop(1, "rgba(254, 112, 150, 1)");
    var gradientBar4 = ctx.createLinearGradient(0, 0, 0, 50);
    gradientBar4.addColorStop(0, "rgba(6, 185, 157, 1)");
    gradientBar4.addColorStop(1, "rgba(132, 217, 210, 1)");

    const visitSaleData = {
      labels: ["Bois", "Céramique"],
      datasets: [
        {
          label: "Classique",
          borderColor: gradientBar1,
          backgroundColor: gradientBar1,
          hoverBackgroundColor: gradientBar1,
          legendColor: gradientBar1,
          pointRadius: 0,
          fill: false,
          borderWidth: 1,
          data: [
            (this.props.countwoodclassicProducts * 100) / 8,
            (this.props.countceramicclassicProducts * 100) / 8,
          ],
        },
        {
          label: "Moderne",
          borderColor: gradientBar2,
          backgroundColor: gradientBar2,
          hoverBackgroundColor: gradientBar2,
          legendColor: gradientBar2,
          pointRadius: 0,
          fill: false,
          borderWidth: 1,
          data: [
            (this.props.countwoodmodernProducts * 100) / 8,
            (this.props.countceramicmodernProducts * 100) / 8,
          ],
        },
        {
          label: "Cadre en bois",
          borderColor: gradientBar3,
          backgroundColor: gradientBar3,
          hoverBackgroundColor: gradientBar3,
          legendColor: gradientBar3,
          pointRadius: 0,
          fill: false,
          borderWidth: 1,
          data: [
            (this.props.countwoodwoodProducts * 100) / 8,
            (this.props.countceramicwoodProducts * 100) / 8,
          ],
        },
        {
          label: "Cadre en céramique",
          borderColor: gradientBar4,
          backgroundColor: gradientBar4,
          hoverBackgroundColor: gradientBar4,
          legendColor: gradientBar4,
          pointRadius: 0,
          fill: false,
          borderWidth: 1,
          data: [
            (this.props.countwoodceramicProducts * 100) / 8,
            (this.props.countceramicceramicProducts * 100) / 8,
          ],
        },
      ],
    };

    if (previousState.visitSaleData === this.state.visitSaleData) {
      this.setState({
        visitSaleData,
      });
    }
  }

  render() {

    return (
      <div>
        <div className="proBanner"></div>
        <div className="page-header">
          <h3 className="page-title">
            <span
              className="page-title-icon  text-white mr-2"
              style={{ backgroundColor: "#D7B4A9" }}
            >
              <i className="mdi mdi-home"></i>
            </span>{" "}
            Dashboard{" "}
          </h3>
        </div>
        <div className="row">
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div className="card-body">
                <img
                  src={require("../../assets/images/dashboard/circle.svg")}
                  className="card-img-absolute"
                  alt="circle"
                />
                <h4 className="font-weight-normal mb-3">
                  Nombre total des produits{" "}
                  <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{this.props.countproducts}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img
                  src={require("../../assets/images/dashboard/circle.svg")}
                  className="card-img-absolute"
                  alt="circle"
                />
                <h4 className="font-weight-normal mb-3">
                  Nombre des meilleurs ventes{" "}
                  <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{this.props.countbestProducts}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
              <div className="card-body">
                <img
                  src={require("../../assets/images/dashboard/circle.svg")}
                  className="card-img-absolute"
                  alt="circle"
                />
                <h4 className="font-weight-normal mb-3">
                  Nombre des clients inscrits{" "}
                  <i className="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{this.props.countclients}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 stretch-card grid-margin">
            <div
              className="card  card-img-holder text-white"
              style={{ backgroundColor: "#D7B4A9" }}
            >
              <div className="card-body">
                <img
                  src={require("../../assets/images/dashboard/circle.svg")}
                  className="card-img-absolute"
                  alt="circle"
                />
                <h4 className="font-weight-normal mb-3">
                  Nombre total des commandes{" "}
                  <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{this.props.countorders}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="clearfix mb-4">
                  <h4 className="card-title float-left">
                    Pourcentage de chaque catégorie par matière
                  </h4>
                  <div
                    id="visit-sale-chart-legend"
                    className="rounded-legend legend-horizontal legend-top-right float-right"
                  >
                    <ul>
                      <li>
                        <span className="legend-dots bg-primary"></span>
                        Classique (%)
                      </li>
                      <li>
                        <span className="legend-dots bg-info"></span>Moderne (%)
                      </li>
                      <li>
                        <span className="legend-dots bg-danger"></span>Cadre en
                        bois (%)
                      </li>

                      <li>
                        <span className="legend-dots bg-success"></span>Cadre en
                        céramique (%)
                      </li>
                    </ul>
                  </div>
                </div>
                <Bar
                  ref="chart"
                  className="chartLegendContainer"
                  data={this.state.visitSaleData}
                  options={this.state.visitSaleOptions}
                  id="visitSaleChart"
                />
              </div>
            </div>
          </div>
          <div className="col-md-5 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Nombre des produits par matière</h4>
                <Doughnut
                  data={this.state.trafficData}
                  options={this.state.trafficOptions}
                />
                <div
                  id="traffic-chart-legend"
                  className="rounded-legend legend-vertical legend-bottom-left pt-4"
                >
                  <ul>
                    <li>
                      <span className="legend-dots bg-info"></span>Cadres en
                      bois
                      <span className="float-right">
                        {this.props.countwoodProducts}
                      </span>
                    </li>
                    <li>
                      <span className="legend-dots bg-danger"></span>Cadres en
                      céramiques
                      <span className="float-right">
                        {this.props.countceramicProducts}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    authToken: state.AuthReducer.authToken,
    countproducts: state.ProductReducer.countproducts,
    countbestProducts: state.ProductReducer.countbestProducts,
    countclients: state.ClientManagementReducer.countclients,
    countceramicProducts: state.ProductReducer.countceramicProducts,
    countwoodProducts: state.ProductReducer.countwoodProducts,
    countorders: state.OrderReducer.countorders,
    countwoodclassicProducts: state.ProductReducer.countwoodclassicProducts,
    countceramicclassicProducts:
      state.ProductReducer.countceramicclassicProducts,
    countwoodmodernProducts: state.ProductReducer.countwoodmodernProducts,
    countceramicmodernProducts: state.ProductReducer.countceramicmodernProducts,
    countwoodwoodProducts: state.ProductReducer.countwoodwoodProducts,
    countceramicwoodProducts: state.ProductReducer.countceramicwoodProducts,
    countwoodceramicProducts: state.ProductReducer.countwoodceramicProducts,
    countceramicceramicProducts:
      state.ProductReducer.countceramicceramicProducts,
  };
}
export default connect(mapStateToProps, {
  getNbProducts,
  getNbBestProducts,
  getNbclients,
  getNbCeramicProducts,
  getNbWoodProducts,
  getNbOrders,
  getNbCeramicClassiwProducts,
  getNbWoodClassicProducts,
  getNbCeramicClassicProducts,
  getNbWoodModernProducts,
  getNbWoodWoodProducts,
  getNbCeramicWoodProducts,
  getNbWoodCeramicProducts,
  getNbCeramiCeramicProducts,
})(Dashboard);
