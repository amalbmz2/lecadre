import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Trans } from "react-i18next";
import { connect } from "react-redux";
import { LogoutUser } from "../../../../Redux/Actions/AuthAction";


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }
  toggleRightSidebar() {
    document.querySelector(".right-sidebar").classList.toggle("open");
  }
  handleLogout = () => {
    this.props.dispatch(LogoutUser());
  };
  componentDidUpdate() {
    if (this.props.authUser === null) {
      return this.props.history.push("/lecadre/administration/login");
    }
  }

  render() {
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link
            className="navbar-brand brand-logo"
            to="/lecadre/administration/dashboard"
          >
            <img
              style={{
                width: "100%",
                height: "100%",
              }}
              src={require("../../assets/images/lecadre-logo.png")}
              alt="logo"
            />
          </Link>
          <Link
            className="navbar-brand brand-logo-mini"
            to="/lecadre/administration/dashboard"
          >
            <img
              src={require("../../assets/images/logo-mini.svg")}
              alt="logo"
            />
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            onClick={() => document.body.classList.toggle("sidebar-icon-only")}
          >
            <span className="mdi mdi-menu"></span>
          </button>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link">
                  <div className="nav-profile-img">
                    <img
                      src={require("../../assets/images/last.jpg")}
                      alt="user"
                    />
                    <span className="availability-status online"></span>
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-1 text-black">
                      <Trans>Administrateur</Trans>
                    </p>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="navbar-dropdown">
                  <Dropdown.Item onClick={(evt) => evt.preventDefault()}>
                    <i
                      className="mdi mdi-logout mr-2"
                      style={{
                        color: "#bd8270",
                      }}
                    ></i>
                    <Trans>
                      <Link
                        style={{
                          color: "#bd8270",
                          textDecoration: "none",
                        }}
                        onClick={this.handleLogout}
                      >
                        Déconnecter{" "}
                      </Link>{" "}
                    </Trans>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={this.toggleOffcanvas}
          >
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    CheckauthUser: state.AuthReducer.CheckauthUser,
    authUser: state.AuthReducer.authUser,
  };
};

export default withRouter(connect(mapStateToProps)(Navbar));
