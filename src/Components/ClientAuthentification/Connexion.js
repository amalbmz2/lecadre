import React, { Component } from "react";
import { isEmail, checkempty, isPassword } from "../../Validation/Validation";
import { connect } from "react-redux";
import { AuthUser, showAuthLoader } from "../../Redux/Actions/AuthAction";
import { Link, withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import baseUrl from "../../../src/config/config";

class Connexion extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loginerrorAlert: false,
      isopen: false,
      errorAlert: false,
      succedAlert: false,
      forgetPassword: "",
      test: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.ResetPassword = this.ResetPassword.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleTestChange = this.handleTestChange.bind(this);
  }
  handleTestChange = () => {
    this.setState({ test: true });
    this.props.history.push("/connexion");
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  _handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.showAuthLoader();
      const email = this.state.email;
      const password = this.state.password;
      this.props.AuthUser({ email, password });
    }
  };

  componentDidUpdate(previouProps) {
    if (this.props.showMessage !== previouProps.showMessage) {
      this.setState({
        loginerrorAlert: true,
      });
      setTimeout(
        function () {
          this.setState({ loginerrorAlert: false });
        }.bind(this),
        4000
      );
    }
    if (this.props.authUser !== null) {
      this.props.history.push("/");
    }
  }
  handleCancel() {
    this.setState({ isopen: !this.state.isopen });
  }
  ResetPassword() {
    var email1 = this.state.email;

    const params = {
      email: email1,
    };

    axios
      .post(`${baseUrl.baseUrl}/users/forget_password`, params, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        this.setState({
          succedAlert: true,
        });
        setTimeout(
          function () {
            this.setState({ succedAlert: false, isopen: false });
          }.bind(this),
          5000
        );
      })
      .catch((err) => {
        this.setState({
          errorAlert: true,
          email: "",
        });
        setTimeout(
          function () {
            this.setState({ errorAlert: false });
          }.bind(this),
          5000
        );
      });
  }

  handleModal() {
    this.setState({ isopen: !this.state.isopen });
  }
  render() {
    const { email, password } = this.state;
    return (
      <div style={{ backgroundColor: "white" }}>
        {this.state.loginerrorAlert === true ? (
          <Alert
            severity="error"
            style={{
              backgroundColor: "#ffcccc",
              fontSize: "16px",
            }}
          >
            Adresse e-mail ou mot de passe invalide —{" "}
            <strong>Réessayer !</strong>
          </Alert>
        ) : (
          ""
        )}
        {this.state.succedAlert === true ? (
          <Alert
            severity="success"
            style={{
              backgroundColor: "#b3ffcc",
              fontSize: "16px",
            }}
          >
            Veuillez vérifier votre boîte mail — <strong>Vérifier!</strong>
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
            Adresse email non valide — <strong>Réessayer!</strong>
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
          </header>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>

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
          {/* <section id="aa-myaccount ">
            <div className="container ">
              <div className="row ">
                <div className="col-md-12 ">
                  <div className="aa-myaccount-area ">
                    <div className="row ">
                      <div className="col-md-6 "> */}
          <div className="aa-myaccount-login d-flex flex-column d-flex  align-items-center w-100 p-3 mx-auto h-100">
            <ul className="logpolice d-flex flex-row">
              
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
                    Connexion
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
                    Connexion
                  </a>
                )}
              </li>
              <li>
                <a
                  style={{
                    color: "#bd827086",
                    textDecoration: "none",
                  }}
                  href="/inscription"
                >
                  Inscription
                </a>
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
                error={isEmail(this.state.email) === false ? true : false}
                value={this.state.email || ""}
                onChange={this.handleChange("email")}
                onKeyPress={(event) => this._handleKeyPress(event)}
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
              <p>&nbsp;</p>
              <TextField
                style={{
                  width: "400px",
                }}
                variant="outlined"
                value={this.state.password || ""}
                onChange={this.handleChange("password")}
                onKeyPress={(event) => this._handleKeyPress(event)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="passwordClient"
                autoComplete="current-password"
                error={isPassword(this.state.password) === false ? true : false}
                helperText={
                  isPassword(this.state.password) === false
                    ? "8 caractéres au minimum"
                    : ""
                }
              />
              <div>
                <Link
                  data-toggle="modal"
                  data-target="#infos"
                  className="p-2"
                  style={{
                    marginLeft: "240px",
                    fontSize: "17px",
                    color: "#585858",
                  }}
                  onClick={() => {
                    this.handleModal({});
                  }}
                >
                  Mot de passe oublié ?
                </Link>
                <div
                  style={{
                    marginTop: "320px",
                  }}
                  className="modal"
                  id="infos"
                  isopen={this.state.isopen}
                  onHide={() => this.state.handleCancel()}
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4
                          className="modal-title"
                          style={{
                            fontSize: "18px",
                            height: "70px",
                            fontFamily: "system-ui",
                          }}
                        >
                          Veuillez saisir votre adresse e-mail,un nouveau mot de
                          passe sera envoyé à votre compte Gmail
                        </h4>
                      </div>
                      <div className="modal-body">
                        <TextField
                          size="medium"
                          variant="outlined"
                          value={this.state.email || ""}
                          onChange={this.handleChange("email")}
                          margin="normal"
                          required
                          fullWidth
                          name="email"
                          label="Adresse-email"
                          type="email"
                          id="email"
                          autoComplete="current-email"
                        />
                      </div>
                      <div className="modal-footer">
                        <Button
                          onClick={this.ResetPassword}
                          style={{
                            padding: "8px 20px",
                            marginRight: "-3px",
                            marginTop: "10px",
                            height: "40px",
                            textAlign: "center",
                            textDecoration: "none",
                            backgroundColor: "#BD8270",
                            border: "1px solid#BD8270",
                            borderRadius: "50px",
                          }}
                          className="aa-browse-btn"
                        >
                          Confirmer
                        </Button>
                        <Button
                          style={{
                            padding: "8px 20px",
                            marginRight: "5px",
                            marginTop: "10px",
                            height: "40px",
                            textAlign: "center",
                            textDecoration: "none",
                            backgroundColor: "#000000",
                            border: "1px solid#BD8270",
                            borderRadius: "50px",
                          }}
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          className="aa-browse-btn"
                          onClick={this.handleCancel}
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                data-dismiss="modal"
                onClick={() => {
                  this.props.showAuthLoader();
                  this.props.AuthUser({ email, password });
                }}
                disabled={
                  !isEmail(this.state.email) ||
                  checkempty(this.state.password) ||
                  checkempty(this.state.email) ||
                  !isPassword(this.state.password)
                }
              >
                Se connecter
              </Button>
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
function mapStateToProps(state) {
  return {
    CheckauthUser: state.AuthReducer.CheckauthUser,
    authUser: state.AuthReducer.authUser,
    showMessage: state.AuthReducer.showMessage,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    AuthUser,
    showAuthLoader,
  })(Connexion)
);
