import React, { Component } from "react";
import { isEmail, checkempty, isPassword } from "../../Validation/Validation";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import baseUrl from '../../../src/config/config';

export default class Inscription extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      succedAlert: false,
      errorAlert: false,
      test: false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.handlenscription = this.handleIscription.bind(this);
    this.handleTestChange = this.handleTestChange.bind(this);

  }
  handleTestChange = () => {
    this.setState({ test: true });
    this.props.history.push("/inscription");
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleIscription = async (id, event) => {
    var objClient = {};
    objClient.firstName = this.state.firstName;
    objClient.lastName = this.state.lastName;
    objClient.email = this.state.email;
    objClient.password = this.state.password;
    axios
      .post(`${baseUrl.baseUrl}/users/signup`, objClient, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        this.setState({
          succedAlert: true,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setTimeout(
          function () {
            this.setState({ succedAlert: false });
          }.bind(this),
          5000
        );
      })
      .catch((err) => {
        this.setState({
          errorAlert: true,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setTimeout(
          function () {
            this.setState({ errorAlert: false });
          }.bind(this),
          5000
        );
      });
  };
  _handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.showAuthLoader();
      const email = this.state.email;
      const password = this.state.password;
      this.props.AuthUser({ email, password });
    }
  };
  render() {
    return (
      <div style={{ backgroundColor: "white" }}>
        {this.state.succedAlert === true ? (
          <Alert
            severity="success"
            style={{
              backgroundColor: "#b3ffcc",
              fontSize: "16px",
            }}
          >
            Vous êtes inscrit(e) maintenant à Le cadre —{" "}
            <strong>prendre plaisir !</strong>
          </Alert>
        ) : (
          ""
        )}
        {this.state.errorAlert === true ? (
          <Alert
            severity="error"
            style={{
              backgroundColor: "#ffcccc",
              fontSize: "16px",
            }}
          >
            Adresse e-mail déjà existante — <strong>Réessayer!</strong>
          </Alert>
        ) : (
          ""
        )}
        <div>
          {/* wpf loader Two */}
          {/* <div id="wpf-loader-two">          
          <div className="wpf-loader-two-inner">
            <span>Loading</span>
          </div>
        </div>  */}
          {/* / wpf loader Two */}
          {/* SCROLL TOP BUTTON */}
          <a className="scrollToTop" href="#">
            <i className="fa fa-chevron-up" />
          </a>
          {/* END SCROLL TOP BUTTON */}
          {/* Start header section */}
          <header id="aa-header">
            {/* start header top  */}
            <div
              className="aa-header-top"
              style={{ backgroundColor: "#BD8270", height: "60px" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="aa-header-top-area">
                      <div className="aa-header-top-right d-flex justify-content-end">
                        <ul className="aa-head-top-nav-right">
                          <li>
                            <a
                              style={{
                                textDecoration: "none",
                              }}
                              href="/"
                            >
                              ACCUEIL
                            </a>
                          </li>
                          <li>
                            <a
                              style={{
                                textDecoration: "none",
                              }}
                              href="/connexion"
                            >
                              CONNEXION
                            </a>
                          </li>
                          <li>
                            <a
                              style={{
                                textDecoration: "none",
                              }}
                              href="/inscription"
                            >
                              INSCRIPTION
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="aa-logo d-flex justify-content-start">
                      <a href="/">
                        <img
                          src="assets/img/lecadre-transparant.png"
                          alt="logo img"
                          style={{
                            height: "180px",
                            weight: "200px",
                          marginLeft: "-115px",
                            marginTop: "8px",
                          }}
                        />
                      </a>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>

          </header>
          {/* / header section */}
          {/* menu */}
          <section
            id="menu"
            style={{ backgroundColor: "white", color: "gray" }}
          >
            <div className="container">
              <div className="menu-area">
                {/* Navbar */}
                <div className="navbar navbar-default" role="navigation">
                  <div className="navbar-header">
                    <button
                      type="button"
                      className="navbar-toggle"
                      data-toggle="collapse"
                      data-target=".navbar-collapse"
                    >
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* / menu */}
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          {/* Cart view section */}
          {/* <section id="aa-myaccount">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="aa-myaccount-area">
                    <div className="row">
                      <div className="col-md-6 "> */}

                        <div className="aa-myaccount-login d-flex flex-column d-flex  align-items-center w-100 p-3 mx-auto h-100">
                          <ul className="logpolice d-flex flex-row">
                            <li>
                              <a
                                style={{
                                  color: "#bd827086",
                                  textDecoration: "none",
                                }}
                                href="/connexion"
                              >
                                Connexion
                              </a>
                            </li>
                            <li>
                            {this.state.test === false ? (
                  <a
                    onClick={() => {
                      this.handleTestChange({});
                    }}
                    style={{
                      color: "#BD8270",
                      textDecoration: "none",
                    }}
                  >
                    Inscription
                  </a>
                ) : (
                  <a
                    onClick={() => {
                      this.handleTestChange({});
                    }}
                    style={{
                      color: "#bd827086",
                      textDecoration: "none",
                    }}
                  >
                  Inscription
                  </a>
                )}
                            </li>
                          </ul>


                          <hr className="classlig d-flex flex-column d-flex  align-items-center w-400 mx-auto" />

                          <p>&nbsp;</p>
                          <p>&nbsp;</p>
                          <form
                            action
                            style={{ fontSize: "28px" }}
                            className="aa-login-form d-flex flex-column d-flex  align-items-center w-100 p-3 mx-auto h-100"
                          >
                          
                            <TextField
                              style={{                              
                               width: "400px",
                              }}
                              variant="outlined"
                              value={this.state.firstName || ""}
                              onChange={this.handleChange("firstName")}
                              onKeyPress={(event) =>
                                this._handleKeyPress(event)
                              }
                              margin="normal"
                              required
                              fullWidth
                              name="firstName"
                              label="Nom"
                              type="firstName"
                              id="firstName"
                              autoComplete="current-firstName"
                            />
                            <TextField
                              style={{
                               width: "400px",
                              }}
                              variant="outlined"
                              value={this.state.lastName || ""}
                              onChange={this.handleChange("lastName")}
                              onKeyPress={(event) =>
                                this._handleKeyPress(event)
                              }
                              margin="normal"
                              required
                              fullWidth
                              name="lastName"
                              label="Prénom"
                              type="lastName"
                              id="lastName"
                              autoComplete="current-lastName"
                            />
                            <TextField
                              style={{
                             width: "400px",
                              }}
                              variant="outlined"
                              error={
                                isEmail(this.state.email) === false
                                  ? true
                                  : false
                              }
                              value={this.state.email || ""}
                              onChange={this.handleChange("email")}
                              onKeyPress={(event) =>
                                this._handleKeyPress(event)
                              }
                              margin="normal"
                              required
                              fullWidth
                              name="email"
                              label="Adresse email"
                              type="email"
                              id="email"
                              autoComplete="current-email"
                              helperText={
                                isEmail(this.state.email) === false
                                  ? "adresse email n'est pas validée"
                                  : ""
                              }
                            />
                            <TextField
                              style={{
                            width: "400px",
                              }}
                              variant="outlined"
                              value={this.state.password || ""}
                              onChange={this.handleChange("password")}
                              onKeyPress={(event) =>
                                this._handleKeyPress(event)
                              }
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Mot de passe"
                              type="password"
                              id="passwordClient"
                              autoComplete="current-password"
                              error={
                                isPassword(this.state.password) === false
                                  ? true
                                  : false
                              }
                              helperText={
                                isPassword(this.state.password) === false
                                  ? "8 caractéres au minimum"
                                  : ""
                              }
                            />
                            <p>&nbsp;</p>
                            <div className="p-2">


                            <Button
                              style={{
                                marginLeft: "10px",                           
                              textAlign: "center",
                               textDecoration: "none",
                               backgroundColor: "#BD8270",
                               border: "1px solid#BD8270",
                               borderRadius: "50px",
                          

                              }}
                              className="aa-browse-btn d-flex flex-column d-flex  align-items-center w-400 p-3 mx-auto h-100"
                              disabled={
                                !isEmail(this.state.email) ||
                                checkempty(this.state.password) ||
                                checkempty(this.state.firstName) ||
                                checkempty(this.state.lastName) ||
                                checkempty(this.state.email) ||
                                !isPassword(this.state.password)
                              }
                              onClick={this.handleIscription}
                            >
                              S'inscrire
                            </Button>
                            </div>
                          </form>
                        </div>
                      {/* </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          {/* / Cart view section */}
        </div>
      </div>
    );
  }
}
