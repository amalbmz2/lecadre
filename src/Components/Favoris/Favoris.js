import React, { Component } from "react";
import { getCartList } from "../../Redux/Actions/CartAction";
import {addItemFromFavorisToCart } from "../../Redux/Actions/FavorisAction";

import {
  getFavoriteList,
  getFavorisItem,
  deleteFromFavoris,
} from "../../Redux/Actions/FavorisAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import {getProduct} from "../../Redux/Actions/ProductAction";
import { Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";
import { getClientById } from "../../Redux/Actions/ClientManagementAction";
import { LogoutUser } from "../../Redux/Actions/AuthAction";

class Favoris extends Component {
  constructor(props) {
    super(props);
    this.state = {
      succeedAlert: false,
      succeedCartAlert: false,
      errorCartAlert: false,
      succeedLogoutAlert:false,

    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      this.props.getCartList(localStorage.getItem("userId"));
      this.props.getFavoriteList(localStorage.getItem("userId"));
    }
  }
  handleDelete(id) {
    this.props.deleteFromFavoris(id);
    this.setState({ succeedAlert: true });
    setTimeout(
      function () {
        this.setState({ succeedAlert: false });
      }.bind(this),
      4000
    );
    this.props.getFavorisItem(id);
  }

  handleAddToCart(id) {
    if (localStorage.getItem("token") !== null) {
      this.props.addItemFromFavorisToCart(id);
      this.setState({ succeedCartAlert: true });
      setTimeout(
        function () {
          this.setState({ succeedCartAlert: false });
        }.bind(this),
        4000
      );

    } else {
      this.setState({ errorCartAlert: true });
      setTimeout(
        function () {
          this.setState({ errorCartAlert: false });
        }.bind(this),
        4000
      );
    }
    this.props.getFavorisItem(id);

  }
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
      <div style={{ backgroundColor: "white" }}>
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
                style={{
                  width: "60px",
                  height: "40px",
                  marginRight: "10px",
                }}
                className="iconright"
                src="assets/img/passion-full.png"
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
                Favoris
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
              <strong> {this.props.favoriteItem.productName}</strong> a été
              supprimé de votre favoris !!
            </Alert>
          ) : (
            ""
          )}
          {this.state.succeedCartAlert === true ? (
            <Alert
              severity="success"
              style={{
                backgroundColor: "#b3ffcc",
                fontSize: "16px",
              }}
            >
              <strong>{this.props.favoriteItem.productName}</strong> a été ajouté
              dans votre panier !!
              <strong> Vérifier</strong>
            </Alert>
          ) : (
            ""
          )}
          {this.state.errorCartAlert === true ? (
            <Alert
              severity="error"
              style={{
                backgroundColor: "#ffcccc",
                fontSize: "16px",
              }}
            >
              Veuillez connecter tout d'abord s'il vous plaît —{" "}
              <Link to={"/connexion"}>Connecter-Vous !!</Link>
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
                            {this.props.favoriteList.map((item) => (
                              <figure className="col-md-4">
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
                                      <div class="d-flex flex-row-reverse">
                                        <Link
                                          class="p-2"
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
                                        <a
                                        onClick={() =>
                                      this.handleAddToCart(item.id)
                                    }
                                          className="aa-product-cart"
                                          class="p-2"
                                        >
                                          <img
                                            style={{
                                              width: "40px",
                                              height: "34px",
                                              // marginTop: "-70px",
                                            }}
                                            src="assets/img/shopping-cart.png"
                                            alt=""
                                          />{" "}
                                        </a>
                                      </div>
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
                                          marginTop: "-20px",
                                        }}
                                      >
                                        {item.price} DT
                                      </h4>
                                    </div>
                                  </figcaption>
                                </div>
                              </figure>
                            ))}
                          </div>
                        </div>
                      </div>
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
    cartList: state.CartReducer.cartList,
    favoriteList: state.FavorisReducer.favoriteList,
    favoriteItem: state.FavorisReducer.favoriteItem,
    listproduct: state.ProductReducer.listproduct,
    client: state.ClientManagementReducer.client,

  };
}
export default connect(mapStateToProps, {
  getCartList,
  getFavoriteList,
  getFavorisItem,
  deleteFromFavoris,
  addItemFromFavorisToCart,
    getProduct,
    getClientById,
    LogoutUser

  
})(Favoris);
