import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Trans } from "react-i18next";
import { Collapse } from "react-bootstrap";
import { connect } from "react-redux";
import { getClientById } from "../../../../Redux/Actions/ClientManagementAction";

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
    this.props.getClientById(localStorage.getItem("userId"));
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/table", state: "tablesMenuOpen" },
      { path: "/commandes", state: "odresMenuOpen" },
      { path: "/clients", state: "clientsMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a
              href="!#"
              className="nav-link"
              onClick={(evt) => evt.preventDefault()}
            >
              <div className="nav-profile-image">
                <img
                  src={require("../../assets/images/last.jpg")}
                  alt="profile"
                />
                <span className="login-status online"></span>{" "}
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2">
                  <Trans>
                    {this.props.client.firstName}.{this.props.client.lastName}
                  </Trans>
                </span>
                <span className="text-secondary text-small">
                  <Trans>Administrateur</Trans>
                </span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>
          <li
            className={
              this.isPathActive("/lecadre/administration/dashboard")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/lecadre/administration/dashboard">
              <span className="menu-title">
                <Trans>Dashboard</Trans>
              </span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/table") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.tablesMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("tablesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Produits</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-cart menu-icon"></i>
            </div>
            <Collapse in={this.state.tablesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/table/produits")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/table/produits"
                  >
                    <Trans>Liste des produits</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/commandes") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.odresMenuOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("odresMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Commandes</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-book-open menu-icon"></i>
            </div>
            <Collapse in={this.state.odresMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/commandes/ordinaires")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/commandes/ordinaires"
                  >
                    <Trans>Commandes</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/commandes/specifiques")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/commandes/specifiques"
                  >
                    <Trans>Commandes Spécifiques</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/clients") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.clientsMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("clientsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Clients</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account menu-icon"></i>
            </div>
            <Collapse in={this.state.clientsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/clients/listeclients")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/clients/listeclients"
                  >
                    <Trans>Clients</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.props.getClientById(localStorage.getItem("userId"));
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

function mapStateToProps(state) {
  return {
    client: state.ClientManagementReducer.client,
  };
}
export default withRouter(
  connect(mapStateToProps, {
    getClientById,
  })(Sidebar)
);
