import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getWoodProducts,getProducts } from "../../Redux/Actions/ProductAction";
import { getCartList, addItemToCart } from "../../Redux/Actions/CartAction";
import { LogoutUser } from "../../Redux/Actions/AuthAction";
import {
  getFavoriteList,
  addToFavoris,
} from "../../Redux/Actions/FavorisAction";
import { Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";
import { getClientById } from "../../Redux/Actions/ClientManagementAction";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import baseUrl from "../../config/config";
class WoodCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      woodList: [],
      searchTerm: "",
      searchResults: [],
      succeedAlert: false,
      succeedFavoriteAlert: false,
      errorFavoriteAlert: false,
      succeedCartAlert: false,
      errorCartAlert: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAddToFavoris = this.handleAddToFavoris.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleAddToFavoris = this.handleAddToFavoris.bind(this);
  }

  componentDidMount() {
    this.props.getWoodProducts();
    this.props.getCartList(localStorage.getItem("userId"));
    this.props.getFavoriteList(localStorage.getItem("userId"));
  }
  componentDidUpdate() {
    this.props.getClientById(localStorage.getItem("userId"));
    let result = this.props.listProducts.filter((o1) =>
    this.props.favoriteList.some((o2) => o1.productName === o2.productName)
  );
  result.map((ele)=>
    axios
      .patch(
        `${baseUrl.baseUrl}/list-products/` +
          ele.id +
          `?access_token=${localStorage.token}`,
        { FavorisTag: true }
      )
      .then((res) => {
        //  dispatch({ type: PATCH_FAVORIS_TAG, payload: res.data });
        //axios.get(`${baseUrl.baseUrl}/list-products`).then((respo) => {
         // dispatch({ type: GET_ALL_PRODUCTS, payload: respo.data.reverse() });
       // });
      }),
  )
  }
  handleChange = (searchTerm) => (event) => {
    this.setState({ searchTerm: event.target.value });
    if (this.state.searchTerm !== "") {
      const newlistProducts = this.props.woodList.filter((listProduct) => {
        return Object.values(listProduct)
          .join("")
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase());
      });
      this.setState({ searchResults: newlistProducts });
    } else {
      this.setState({ searchResults: this.props.woodList });
    }
  };
  handleLogout = () => {
    this.props.LogoutUser();
    this.setState({ succeedAlert: true });
    setTimeout(
      function () {
        this.setState({ succeedAlert: false });
      }.bind(this),
      4000
    );
  };
  handleAddToFavoris(id) {
    if (localStorage.getItem("token") !== null) {
      this.props.addToFavoris(id);
      this.setState({ succeedFavoriteAlert: true });
      setTimeout(
        function () {
          this.setState({ succeedFavoriteAlert: false });
        }.bind(this),
        4000
      );
    } else {
      this.setState({ errorFavoriteAlert: true });
      setTimeout(
        function () {
          this.setState({ errorFavoriteAlert: false });
        }.bind(this),
        4000
      );
    }
  }

  handleAddToCart(id) {
    if (localStorage.getItem("token") !== null) {
      this.props.addItemToCart(id);
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
  }
  render() {

    return (
      <div style={{ backgroundColor: "white" }}>
        {/* wpf loader Two */}
        {/* <div id="wpf-loader-two">
            <div className="wpf-loader-two-inner">
              <span>Loading</span>
            </div>
          </div> */}
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
                    <div className="aa-search-box">
                      <form action>
                        <input
                          type="text"
                          name
                          id
                          style={{
                            borderRadius: "20px",
                            borderColor: "#BD8270",
                          }}
                          placeholder="Chercher ici"
                          value={this.state.searchTerm}
                          onChange={this.handleChange("searchTerm")}
                        />
                        <button type="submit">
                          <span className="fa fa-search" />
                        </button>
                      </form>
                    </div>

                    {/* / search box */}
                  </div>
                  <p>&nbsp;</p>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}

          {/* / header bottom  */}
        </header>
        {this.state.succeedAlert === true ? (
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
        <section id="menu" style={{ backgroundColor: "white", color: "gray" }}>
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
                <div className="navbar-collapse collapse d-flex justify-content-between">
                  {/* Left nav */}
                  <ul className="nav navbar-nav">
                    <li>
                      <a href="/tous" style={{ color: "gray" }}>
                        Tous
                      </a>
                    </li>
                    <li>
                      <a href="/classiques" style={{ color: "gray" }}>
                        Classique{" "}
                      </a>
                    </li>
                    <li>
                      <a href="/modernes" style={{ color: "gray" }}>
                        Moderne{" "}
                      </a>
                    </li>
                    <li>
                      <a href="/enbois" style={{ color: "gray" }}>
                        Cadre en bois{" "}
                      </a>
                    </li>
                    <li>
                      <a href="/céramiques" style={{ color: "gray" }}>
                        Cadre en ceramique
                      </a>
                    </li>
                    <li>
                      <a href="#" style={{ color: "gray" }}>
                        Personnalisé
                      </a>
                    </li>
                  </ul>
                </div>
                {/*/.nav-collapse */}
              </div>
            </div>
          </div>
        </section>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        {this.state.succeedFavoriteAlert === true &&
        this.props.listproduct.favorisTag === false ? (
          <Alert
            severity="success"
            style={{
              backgroundColor: "#b3ffcc",
              fontSize: "16px",
            }}
          >
            <strong>{this.props.listproduct.productName}</strong> a été ajouté
            dans votre favoris !!
            <strong> Vérifier</strong>
          </Alert>
        ) : (
          ""
        )}
        {this.state.errorFavoriteAlert === true ? (
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

        {this.state.succeedCartAlert === true ? (
          <Alert
            severity="success"
            style={{
              backgroundColor: "#b3ffcc",
              fontSize: "16px",
            }}
          >
            <strong>{this.props.listproduct.productName}</strong> a été ajouté
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

        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <section id="aa-product">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="aa-product-area">
                    <div className="aa-product-inner">
                      {/* Tab panes */}
                      <p>&nbsp;</p>
                      <div className="tab-pane  in active" id="men">
                        {this.state.searchTerm.length < 1
                          ? this.props.woodList.map((listProduct) => (
                              <figure className="col-md-4" key={listProduct.id}>
                                <Link
                                  className="aa-product-img"
                                  to={`/details${listProduct.id}`}
                                >
                                  <img
                                    style={{
                                      width: "300px",
                                      height: "290px",
                                      paddingBottom: "10px",
                                    }}
                                    src={listProduct.productImage}
                                    alt=""
                                  />
                                </Link>
                                <figcaption>
                                  <h4
                                    className="aa-product-title"
                                    style={{
                                      marginRight: "260px",
                                      fontSize: "13px",
                                    }}
                                  >
                                    {listProduct.productName}
                                  </h4>
                                  <p
                                    style={{
                                      marginRight: "260px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {listProduct.price} dt
                                  </p>
                                </figcaption>
                                {listProduct.FavorisTag === false ||
                                  localStorage.getItem("userId") === null ? (
                                    <a
                                      className="aa-product-favoris"
                                      onClick={() =>
                                        this.handleAddToFavoris(listProduct.id)
                                      }
                                    >
                                      <img
                                        style={{
                                          width: "40px",
                                          height: "30px",
                                          paddingRight: "10px",
                                          marginTop: "-70px",
                                          marginLeft: "210px",
                                        }}
                                        src="assets/img/passion.png"
                                        alt=""
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      className="aa-product-favoris"
                                      //onClick={() =>
                                      //  this.handleAddToFavoris(listProduct.id)
                                      // }
                                    >
                                      <img
                                        style={{
                                          width: "40px",
                                          height: "30px",
                                          paddingRight: "10px",
                                          marginTop: "-70px",
                                          marginLeft: "210px",
                                        }}
                                        src="assets/img/passion-full.png"
                                        alt=""
                                      />
                                    </a>
                                  )}

                                  <a
                                    className="aa-product-cart"
                                    onClick={() =>
                                      this.handleAddToCart(listProduct.id)
                                    }
                                  >
                                    <img
                                      style={{
                                        width: "40px",
                                        height: "30px",
                                        paddingLeft: "10px",
                                        marginTop: "-70px",
                                      }}
                                      src="assets/img/shopping-cart.png"
                                      alt=""
                                    />
                                  </a>
                                </figure>
                            ))
                          : this.state.searchResults.map((listProduct) => (
                            <figure className="col-md-4" key={listProduct.id}>
                                <Link
                                  className="aa-product-img"
                                  to={`/details${listProduct.id}`}
                                >
                                  <img
                                    style={{
                                      width: "300px",
                                      height: "290px",
                                      paddingBottom: "10px",
                                    }}
                                    src={listProduct.productImage}
                                    alt=""
                                  />
                                </Link>
                                <figcaption>
                                  <h4
                                    className="aa-product-title"
                                    style={{
                                      marginRight: "260px",
                                      fontSize: "13px",
                                    }}
                                  >
                                    {listProduct.productName}
                                  </h4>
                                  <p
                                    style={{
                                      marginRight: "260px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {listProduct.price} dt
                                  </p>
                                </figcaption>
                                {listProduct.FavorisTag === false ||
                                  localStorage.getItem("userId") === null ? (
                                    <a
                                      className="aa-product-favoris"
                                      onClick={() =>
                                        this.handleAddToFavoris(listProduct.id)
                                      }
                                    >
                                      <img
                                        style={{
                                          width: "40px",
                                          height: "30px",
                                          paddingRight: "10px",
                                          marginTop: "-70px",
                                          marginLeft: "210px",
                                        }}
                                        src="assets/img/passion.png"
                                        alt=""
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      className="aa-product-favoris"
                                      //onClick={() =>
                                      //  this.handleAddToFavoris(listProduct.id)
                                      // }
                                    >
                                      <img
                                        style={{
                                          width: "40px",
                                          height: "30px",
                                          paddingRight: "10px",
                                          marginTop: "-70px",
                                          marginLeft: "210px",
                                        }}
                                        src="assets/img/passion-full.png"
                                        alt=""
                                      />
                                    </a>
                                  )}

                                  <a
                                    className="aa-product-cart"
                                    onClick={() =>
                                      this.handleAddToCart(listProduct.id)
                                    }
                                  >
                                    <img
                                      style={{
                                        width: "40px",
                                        height: "30px",
                                        paddingLeft: "10px",
                                        marginTop: "-70px",
                                      }}
                                      src="assets/img/shopping-cart.png"
                                      alt=""
                                    />
                                  </a>
                                </figure>
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <span
              class="dot"
              style={{
                height: "25px",
                width: "25px",
                backgroundColor: "#bd827086 ",
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></span>
            <span
              class="dot"
              style={{
                height: "25px",
                width: "25px",
                backgroundColor: "#bbb",
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></span>
          </div>
        </section>
        {/* / Products section */}
        {/* footer */}
        <footer id="aa-footer">
          {/* footer bottom */}
          <div className="aa-footer-top">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="aa-footer-top-area ">
                    <div className="row">
                      <div className="col-md-4 col-sm-6">
                        <div className="aa-footer-widget ">
                          <h3 align="center" style={{fontSize:"18px"}}>Contact</h3>
                          <table align="center" cellSpacing={1} cellPadding={5} style={{fontSize:"16px"}}>
                            <tbody>
                              <tr>
                                <td>
                                  <img
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      paddingBottom: "5px",
                                      paddingRight: "5px",
                                    }}
                                    src="assets/img/telephone-call.png"
                                    alt=""
                                  />{" "}
                                </td>
                                <td style={{ color: "white" }}> 72 220 001 </td>
                              </tr>
                              <tr>
                                <td>
                                  <img
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      paddingRight: "5px",
                                    }}
                                    src="assets/img/whatsapp.png"
                                    alt=""
                                  />
                                </td>
                                <td style={{ color: "white" }}> 50 857 355 </td>
                              </tr>
                              <tr>
                                <td>
                                  <img
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      paddingRight: "5px",
                                    }}
                                    src="assets/img/mail.png"
                                    alt=""
                                  />
                                </td>
                                <td style={{ color: "white" }}>
                                  {" "}
                                  lecadre@live.fr{" "}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <img
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      paddingRight: "5px",
                                    }}
                                    src="assets/img/facebook.png"
                                    alt=""
                                  />
                                </td>
                                <td style={{ color: "white" }}>Le Cadre</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="aa-footer-widget">
                          <div className="aa-footer-widget">
                            <h3 align="center" style={{fontSize:"18px"}}>Adresse</h3>
                            <img
                              style={{
                                width: "30px",
                                height: "30px",
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                              src="assets/img/placeholder.png"
                              alt=""
                            />
                            <ul className="aa-footer-nav">
                              <p
                                style={{ color: "white", textAlign: "center",fontSize:"16px" }}
                              >
                                Avenue Dali El Jazi Sidi El Mahrsi Nabeul
                              </p>
                              <p></p>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="aa-footer-widget">
                          <div className="aa-footer-widget">
                            <h3 align="center" style={{fontSize:"18px"}}>À propos de nous</h3>
                            <p style={{ color: "white", textAlign: "center",fontSize:"16px" }}>
                              {" "}
                              Vente de tableaux artistiques et tout autre sorte
                              de cadres et miroirs décoratifs. Nous offrons
                              également un service d'impression sur tout support
                              accompagner d'un conseil pour l'encadrement pour
                              répondre à toute demande personnalisée et
                              spécifique.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Login Modal */}
        </footer>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    woodList: state.ProductReducer.woodList,
    cartList: state.CartReducer.cartList,
    favoriteList: state.FavorisReducer.favoriteList,
    listproduct: state.ProductReducer.listproduct,
    client: state.ClientManagementReducer.client,
    listProducts: state.ProductReducer.listProducts,

  };
}
export default connect(mapStateToProps, {
  getWoodProducts,
  getCartList,
  LogoutUser,
  getFavoriteList,
  addToFavoris,
  addItemToCart,
  getClientById,
  getProducts,

})(WoodCategory);
