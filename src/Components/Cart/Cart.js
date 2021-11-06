import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getCartList,
  deleteFromCart,
  getCartItem,
} from "../../Redux/Actions/CartAction";
import { sendOrder } from "../../Redux/Actions/OrderAction";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { Button } from "react-bootstrap";
import { checkempty } from "../../Validation/Validation";
import {
  getFavoriteList,
} from "../../Redux/Actions/FavorisAction";
import baseUrl from '../../../src/config/config';
import { Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";
import { getClientById } from "../../Redux/Actions/ClientManagementAction";
import { LogoutUser } from "../../Redux/Actions/AuthAction";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      succeedAlert: false,
      succeedOrderAlert: false,
      isopen: false,
      firstName: "",
      lastName: "",
      tel: "",
      adress: "",
      livred: false,
      errorOrderAlert: false,
      quantity: "",
      succeedLogoutAlert:false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleModal() {
    this.setState({ isopen: !this.state.isopen });
  }
  handleCancel() {
    this.setState({ isopen: !this.state.isopen });
  }
  updateQuantity(id, e) {
    axios
      .patch(`${baseUrl.baseUrl}/cart-items/${id}`, {
        quantity: Number(e.target.value),
      })
      .then((res) => {
        this.props.getCartList(localStorage.getItem("userId"));
      });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  
  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      this.props.getCartList(localStorage.getItem("userId"));
      this.props.getFavoriteList(localStorage.getItem("userId"));

    }
  }
  handleDelete(id) {
    this.props.deleteFromCart(id);
    //this.props.getCartList(localStorage.getItem("userId"));
    this.setState({ succeedAlert: true });
    setTimeout(
      function () {
        this.setState({ succeedAlert: false });
      }.bind(this),
      4000
    );
    this.props.getCartItem(id);
  }
  handleOrder = async (id, event) => {
    let orderItemList = [];
    this.props.cartList.map(
      (item) => (
        delete item.id,
        delete item.userId,
        delete item.listProductsId,
        orderItemList.push(item)
      )
    );
    var orderObject = {};
    orderObject.firstName = this.state.firstName;
    orderObject.lastName = this.state.lastName;
    orderObject.adress = this.state.adress;
    orderObject.tel = Number(this.state.tel);
    orderObject.livred = this.state.livred;
    orderObject.products = orderItemList;
    this.props.sendOrder(orderObject);

    if (orderObject.products.length !== 0) {
      this.setState({
        succeedOrderAlert: true,
      });
      setTimeout(
        function () {
          this.setState({ succeedOrderAlert: false });
        }.bind(this),
        5000
      );
    } else {
      this.setState({
        errorOrderAlert: true,
      });
      setTimeout(
        function () {
          this.setState({ errorOrderAlert: false });
        }.bind(this),
        5000
      );
    }
  };
  componentDidUpdate() {
    this.props.getClientById(localStorage.getItem("userId"));
  }
  handleLogout = () => {
    this.props.LogoutUser();
    this.setState({ succeedLogoutAlert: true });
    setTimeout(
      function () {
        this.setState({ succeedLogoutAlert: false });
      }.bind(this),
      4000
    );
  };
  render() {
    return (
      <div style={{backgroundColor:"white"}}>
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
                    <div className="aa-header-top-right ">
                      <ul className="aa-head-top-nav-right d-flex justify-content-between">
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
                        {localStorage.getItem("token") !== null ? (
                          <li>
                            <Dropdown alignRight>
                              <Dropdown.Toggle
                                className="nav-link"
                                style={{
                                  width: "200px",
                                  height: "60px",
                                  backgroundColor: "#bd8270",
                                border: "solid#BD8270",
                                  borderRadius: "50px",
                                }}
                              >
                                <div className="nav-profile-img">
                                  <img
                                    style={{ width: "40px", height: "30px" }}
                                    src={"assets/img/user.png"}
                                    alt=""
                                  />
                                  <span className="availability-status online"></span>
                                </div>
                                <div className="nav-profile-text">
                                  <p
                                    className="mb-1 text-black"
                                    style={{ fontSize: "14px" }}
                                  >
                                  {this.props.client.firstName}.{this.props.client.lastName}
                                  </p>
                                </div>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="navbar-dropdown">
                                <Dropdown.Item
                                  onClick={(evt) => evt.preventDefault()}
                                >
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
                        ) : (
                          ""
                        )}
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
          {/* / header top  */}
          {/* start header bottom  */}
          <div className="aa-header-bottom">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="aa-header-bottom-area ">
                    {/* logo  */}
                    <div className="aa-cartbox">
                      <div className="aa-cart-link">
                        <div class="d-flex justify-content-end">
                          <div class="container">
                            <a href="/favoris">
                              <img
                                style={{
                                  width: "50px",
                                  height: "40px",
                                 // paddingRight: "10px",
                                  marginTop: "15px",
                                }}
                                src="assets/img/passion.png"
                                alt=""
                              />
                            </a>
                            <div
                              class="top-right"
                              style={{
                                position: "absolute",
                                top: "-5px",
                                left: "-28px",
                                border: "1px solid#BD8270",
                                borderRadius: "60px",
                                fontSize: "14px",
                                height: "24px",
                                width: "26px",
                                color: "white",
                                textAlign: "center",
                                backgroundColor: "#BD8270",
                              }}
                            >
                              {localStorage.getItem("token") !== null
                                ? this.props.favoriteList.length
                                : 0}
                            </div>
                          </div>
                          <div class="container">
                            <a href="/panier">
                              <img
                                style={{
                                  width: "50px",
                                  height: "44px",
                                 // paddingLeft: "10px",
                                 marginTop: "10px",
                                }}
                                src="assets/img/shopping-cart.png"
                                alt=""
                              />
                            </a>
                            <div
                              class="top-right"
                              style={{
                                position: "absolute",
                                top: "-2px",
                                right: "26px",
                                border: "1px solid#BD8270",
                                borderRadius: "60px",
                                fontSize: "14px",
                                height: "24px",
                                width: "26px",
                                color: "white",
                                textAlign: "center",
                                backgroundColor: "#BD8270",
                              }}
                            >
                              {localStorage.getItem("token") !== null
                                ? this.props.cartList.length
                                : 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                  <p>&nbsp;</p>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}

          {/* / header bottom  */}
        </header>
        {this.state.succeedLogoutAlert === true ? (
          <Alert
            severity="success"
            style={{
              backgroundColor: "#b3ffcc",
              fontSize: "16px",
            }}
          >
            Vous avez déconnecter du plateforme le cadre !!
          </Alert>
        ) : (
          ""
        )}
          {/* / header section */}
          {/* menu */}
          <section
            id="detail"
            style={{ backgroundColor: "#bd82700e", height: "80px" }}
          >
            <div class="d-flex justify-content-start">
              <img
                style={{ width: "60px", height: "40px", marginRight: "10px" }}
                className="iconright"
                src="assets/img/shopping-cart-full.png"
                alt=""
              />
              <h3
                style={{
                  height: "100px",
                  color: "#D7B4A9",
                  fontSize: "50px",
                  marginTop: "4px",
                }}
              >
                Panier
              </h3>
            </div>
          </section>
          {this.state.succeedAlert === true ? (
          <Alert
            severity="success"
            style={{
              backgroundColor: "#b3ffcc",
              fontSize: "16px",
            }}
          >
            <strong> {this.props.cartItem.productName}</strong> a été supprimé
            de votre panier !!
          </Alert>
        ) : (
          ""
        )}
          {this.state.succeedOrderAlert === true ? (
            <Alert
              severity="success"
              style={{
                backgroundColor: "#b3ffcc",
                fontSize: "16px",
              }}
            >
              <strong>Votre commande a été bien enregisté !! </strong> Merci
              pour votre fidélité
            </Alert>
          ) : (
            ""
          )}
          {this.state.errorOrderAlert === true ? (
            <Alert
              severity="error"
              style={{
                backgroundColor: "#ffcccc",
                fontSize: "16px",
              }}
            >
              Votre panier est vide —{" "}
              <strong>Veuillez ajouter des produits à votre panier !!</strong>
            </Alert>
          ) : (
            ""
          )}
          {/* / menu */}
          <section id="aa-product">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="aa-product-area">
                      <div className="aa-product-inner">
                        <p>&nbsp;</p>
                        <div>
                          <div className="tab-pane  in active" id="men">
                            {this.props.cartList.map((item) => (
                              <figure className="col-md-4">
                                {/* <Link className="aa-product-img"> */}
                                <div class="d-flex justify-content-start">
                                  <img
                                    className="aa-product-img"
                                    style={{
                                      width: "300px",
                                      height: "290px",
                                      paddingBottom: "10px",
                                    }}
                                    src={item.productImage}
                                    alt=""
                                  />
                                  <span
                                    class="vertical"
                                    style={{
                                      borderLeft: "1px solid #BD8270",
                                      height: "300px",
                                      marginLeft: "40px",
                                      display: "inline-block",
                                    }}
                                  ></span>
                                </div>
                                {/* </Link> */}

                                <div>
                                  <figcaption>
                                    <div
                                      class="d-flex justify-content-between"
                                      style={{
                                        marginRight: "32px",
                                      }}
                                    >
                                      <h4
                                        className="aa-product-title d-flex justify-content-start"
                                        style={{
                                          fontSize: "20px",
                                          color: "gray",
                                        }}
                                      >
                                        {item.productName}
                                      </h4>

                                      <h4
                                        style={{
                                          fontSize: "20px",
                                          color: "gray",
                                        }}
                                      >
                                        Quantité
                                      </h4>
                                      <Link
                                        onClick={(e) =>
                                          this.handleDelete(item.id, e)
                                        }
                                        style={{
                                          color: "#BD8270",
                                          textDecoration: "none",
                                          fontSize: "30px",
                                        }}
                                      >
                                        &#x2716;
                                      </Link>
                                    </div>
                                    <div></div>
                                    <div
                                      class="d-flex justify-content-start"
                                      style={{}}
                                    >
                                      <h4
                                        class="p-2"
                                        style={{
                                          fontSize: "22px",
                                          color: "#BD8270",
                                        }}
                                      >
                                        {item.price} DT
                                      </h4>
                                      <input
                                        class="p-2"
                                        type="number"
                                        min="1"
                                        style={{
                                          border: "1px solid#BD8270",
                                          borderRadius: "50px",
                                          fontSize: "20px",
                                          height: "40px",
                                          textAlign: "center",
                                          width: "72px",
                                          color: "#6b6d6dc2",
                                          marginLeft: "62px",
                                        }}
                                        defaultValue="1"
                                        onChange={(e) =>
                                          this.updateQuantity(item.id, e)
                                        }
                                   
                                        value={item.quantity}
                                      ></input>
                                    </div>
                                  </figcaption>
                                </div>
                              </figure>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                      <h4
                        class="d-flex justify-content-start"
                        style={{
                          fontSize: "22px",
                          color: "#BD8270",
                        }}
                      >
                        Prix total :<p>&nbsp;</p>
                        {this.props.cartList.reduce(
                          (a, c) => a + c.price * c.quantity,
                          0
                        )}
                        <p>&nbsp;</p>
                        DT
                      </h4>
                      <p>&nbsp;</p>
                      <div className="d-flex justify-content-center">
                        <Link
                          style={{
                            textDecoration: "none",
                            marginRight: "30px",
                            height: "50px",
                            backgroundColor:"#BD8270"
                          }}
                          className="aa-browse-btn "
                          to="/tous"
                        >
                          Ajouter
                        </Link>
                        <Link
                          data-toggle="modal"
                          data-target="#infos"
                          className="text-white p-3 aa-browse-btn"
                          onClick={() => {
                            this.handleModal({});
                          }}
                          style={{
                            textDecoration: "none",
                            textAlign: "center",
                            backgroundColor:"#D7B4A9"
                          }}
                        >
                          Acheter
                        </Link>
                        <div
                          class="d-flex justify-content-center"
                          style={{
                            marginTop: "40px",
                          }}
                          className="modal"
                          id="infos"
                          isopen={this.state.isopen}
                          onHide={() => this.handleCancel()}
                        >
                          <div className="modal-dialog">
                            <div
                              className="modal-content"
                              style={{
                                border: "1px solid#BD8270",
                                borderRadius: "50px",
                              }}
                            >
                              <div
                                className="modal-header"
                                style={{
                                  backgroundColor: "#D7B4A9",
                                  border: "1px solid#BD8270",
                                  borderRadius: "50px",
                                }}
                              >
                                <h4
                                  className="modal-title mdi mdi-account-check"
                                  style={{
                                    fontSize: "20px",
                                    height: "50px",
                                    fontFamily: "system-ui",
                                  }}
                                >
                                  Veuillez saisir vos informations générales
                                </h4>
                              </div>
                              <p>&nbsp;</p>
                              <div className="modal-body">
                                <form action>
                                  <input
                                    style={{
                                      height: "40px",
                                      width: "100%",
                                      textAlign: "center",
                                      textDecoration: "none",
                                      border: "1px solid#BD8270",
                                      borderRadius: "50px",
                                      fontSize: "20px",
                                    }}
                                    className="p-2"
                                    type="text"
                                    placeholder="Nom"
                                    onChange={this.handleChange("firstName")}
                                    value={this.state.firstName || ""}
                                    name="firstName"
                                    id="firstName"
                                    required
                                  />
                                  <p>&nbsp;</p>
                                  <input
                                    style={{
                                      height: "40px",
                                      width: "100%",
                                      textAlign: "center",
                                      textDecoration: "none",
                                      border: "1px solid#BD8270",
                                      borderRadius: "50px",
                                      fontSize: "20px",
                                    }}
                                    className="p-2"
                                    type="text"
                                    placeholder="Prénom"
                                    onChange={this.handleChange("lastName")}
                                    value={this.state.lastName || ""}
                                    name="lastName"
                                    id="lastName"
                                    required
                                  />
                                  <p>&nbsp;</p>
                                  <input
                                    style={{
                                      height: "40px",
                                      width: "100%",
                                      textAlign: "center",
                                      textDecoration: "none",
                                      border: "1px solid#BD8270",
                                      borderRadius: "50px",
                                      fontSize: "20px",
                                    }}
                                    className="p-2"
                                    type="number"
                                    placeholder="Numéro téléphone"
                                    onChange={this.handleChange("tel")}
                                    value={this.state.tel || ""}
                                    name="tel"
                                    id="tel"
                                    required
                                  />
                                  <p>&nbsp;</p>
                                  <input
                                    style={{
                                      height: "40px",
                                      width: "100%",
                                      textAlign: "center",
                                      textDecoration: "none",
                                      border: "1px solid#BD8270",
                                      borderRadius: "50px",
                                      fontSize: "20px",
                                    }}
                                    className="p-2"
                                    type="adress"
                                    placeholder="Adresse compléte"
                                    onChange={this.handleChange("adress")}
                                    value={this.state.adress || ""}
                                    name="adress"
                                    id="adress"
                                    required
                                  />
                                  <p>&nbsp;</p>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <Button
                                  style={{
                                    padding: "8px 20px",
                                    marginRight: "5px",
                                    marginTop: "10px",
                                    height: "40px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    backgroundColor: "#BD8270",
                                    border: "1px solid#BD8270",
                                    borderRadius: "50px",
                                    fontSize: "16px",
                                  }}
                                  className="mdi mdi-checkbox-marked-circle-outline aa-browse-btn"
                                  data-dismiss="modal"
                                  disabled={
                                    checkempty(this.state.firstName) ||
                                    checkempty(this.state.lastName) ||
                                    checkempty(this.state.tel) ||
                                    checkempty(this.state.adress)
                                  }
                                  onClick={() => {
                                    this.handleOrder();
                                  }}
                                >
                                  &nbsp;Confirmer la commande
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
          </section>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    authToken: state.AuthReducer.authToken,
    listproduct: state.ProductReducer.listproduct,
    cartList: state.CartReducer.cartList,
    cartItem: state.CartReducer.cartItem,
    orderList: state.OrderReducer.orderList,
    favoriteList: state.FavorisReducer.favoriteList,
    client: state.ClientManagementReducer.client,

  };
}
export default connect(mapStateToProps, {
  getCartList,
  deleteFromCart,
  getCartItem,
  sendOrder,
  getFavoriteList,
  getClientById,
  LogoutUser

})(Cart);
