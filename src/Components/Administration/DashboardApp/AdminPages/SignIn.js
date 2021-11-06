import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import {
  isEmail,
  checkempty,
  isPassword,
} from "../../../../Validation/Validation";
import TextField from "@material-ui/core/TextField";
import { Button } from "react-bootstrap";
import {
  AuthUser,
  hideMessage,
  hideLicenceMessage,
  showAuthLoader,
  showAuthMessage,
  showLicenceMessage,
  
} from "../../../../Redux/Actions/AuthAction";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
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

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 2500);
    }

    if (this.props.authUser !== null) {
     if (this.props.user_role === "ADMIN") {

this.props.history.push("/lecadre/administration/dashboard");
    }
//  else {
//  }
  }
  }

  
  onConfirm = () => {
    this.props.hideLicenceMessage();
  };

  render() {

    const {
      alertMessage,
      showLicenceMessage,
    } = this.props;

    const { email, password } = this.state;
   
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                <img
            style={{
              width:"100%",
              height:"100%"
            }}
             src={require("../../assets/images/lecadre-logo.png")} alt="logo" />
                </div>
                <h4>Salut! Commençons</h4>
                <h6 className="font-weight-light">
                  Connectez-vous pour continuer.
                </h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <TextField
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
                          ? "adresse email n'est pas valideée"
                          : ""
                      }
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Mot de passe"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.handleChange("password")}
                      onKeyPress={(event) => this._handleKeyPress(event)}
                      value={this.state.password}
                      error={
                        isPassword(this.state.password) === false ? true : false
                      }
                      helperText={
                        isPassword(this.state.password) === false
                          ? "8 caractéres au minimum"
                          : ""
                      }
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <Button
                      className="btn btn-block btn-lg font-weight-medium auth-form-btn"
                      style={{backgroundColor:"#BD8270"}}
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
                      SE CONNECTER
                    </Button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <Link
                      to="/lecadre/administation/forgetpassword"
                      className="auth-link text-black"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        {this.props.showMessage === true ? (
          <SweetAlert
            danger
            show={showLicenceMessage}
            title={alertMessage}
            onConfirm={this.onConfirm}
            openAnim={{ name: "showSweetAlert", duration: 2500 }}
            closeAnim={{ name: "hideSweetAlert", duration: 2500 }}
          ></SweetAlert>
        ) : (
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    CheckauthUser: state.AuthReducer.CheckauthUser,
    authUser: state.AuthReducer.authUser,
    showMessage: state.AuthReducer.showMessage,
    alertMessage: state.AuthReducer.alertMessage,
    showLicenceMessage: state.AuthReducer.showLicenceMessage,
    alertLicenceMessage: state.AuthReducer.alertLicenceMessage,
    user_role: state.AuthReducer.user_role,    
  };
}

export default withRouter(
  connect(mapStateToProps, {
    AuthUser,
    hideMessage,
    hideLicenceMessage,
    showAuthLoader,
    showAuthMessage,
    showLicenceMessage,
    
  })(SignIn)
);
