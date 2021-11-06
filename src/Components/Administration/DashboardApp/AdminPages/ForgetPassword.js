import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { isEmail, checkempty } from "../../../../Validation/Validation";
import TextField from "@material-ui/core/TextField";
import { Button } from "react-bootstrap";
import baseUrl from '../../../../config/config';
import axios from "axios";
import { AlertTitle, Alert } from "@material-ui/lab";

class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errorAlert: false,
      succedAlert: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.ResetPassword = this.ResetPassword.bind(this);
  }
  handleChange(event) {
    this.setState({ email: event.target.value });
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
          email: "",
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

  render() {

    return (
      <div>
        {this.state.succedAlert === true ? (
          <Alert
            severity="success"
            style={{
              backgroundColor: "#b3ffcc",
              marginLeft: "550px",
              marginRight: "550px",
            }}
          >
            <AlertTitle>Succés</AlertTitle>
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
              marginLeft: "550px",
              marginRight: "550px",
            }}
          >
            <AlertTitle>Erreurr</AlertTitle>
            Adresse email non valide — <strong>Réessayer!</strong>
          </Alert>
        ) : (
          ""
        )}

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
                <h4>Mot de passe oublié ?</h4>
                <h6 className="font-weight-light">
                  Ne t'inquiète pas ! remplissez votre adresse email pour
                  réinitialiser votre mot de passe .
                </h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <TextField
                      variant="outlined"
                      error={isEmail(this.state.email) === false ? true : false}
                      value={this.state.email || ""}
                      onChange={this.handleChange}
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
                  <div className="mt-3">
                    <Button
                      className="btn btn-block btn-lg font-weight-medium auth-form-btn"
                      style={{backgroundColor:"#BD8270"}}
                      disabled={
                        !isEmail(this.state.email) ||
                        checkempty(this.state.email)
                      }
                      onClick={this.ResetPassword}
                    >
                      ENVOYER
                    </Button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Retour à la connexion ?{" "}
                    <Link
                      to="/lecadre/administration/login"
                      style={{color:"#BD8270"}}

                    >
                      Connecter
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPassword;
