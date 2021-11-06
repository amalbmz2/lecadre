import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts, getProduct } from "../../Redux/Actions/ProductAction";
import { addToCart, getCartList } from "../../Redux/Actions/CartAction";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import {
  getFavoriteList,
} from "../../Redux/Actions/FavorisAction";
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productItem: {},
      succeedAlert: false,
      errorAlert: false,
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
    this.props.getCartList(localStorage.getItem("userId"));
    this.props.getFavoriteList(localStorage.getItem("userId"));

  }
  componentDidUpdate() {
    let productItem = this.props.listProducts.find(
      (element) => element.id == this.props.match.params.classId
    );
    this.props.getProduct(productItem.id);
  }
  handleAddToCart() {
    var productObject = {};
    productObject.productName = this.props.listproduct.productName;
    productObject.productImage = this.props.listproduct.productImage;
    productObject.price = Number(this.props.listproduct.price);
    productObject.userId = localStorage.getItem("userId");
    if (localStorage.getItem("token") !== null) {
      this.props.addToCart(productObject);
      this.setState({ succeedAlert: true });
      setTimeout(
        function () {
          this.setState({ succeedAlert: false });
        }.bind(this),
        4000
      );
    } else {
      this.setState({ errorAlert: true });
      setTimeout(
        function () {
          this.setState({ errorAlert: false });
        }.bind(this),
        4000
      );
    }
  }
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
            style={{  height: "60px" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="aa-header-top-area">
                   
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
          {/* / header section */}
          {/* menu */}
          <section id="menu">
            <div className="container">
              <div className="menu-area">
                {/* Navbar */}
                <div className="classligne">
                  <p> </p>
                </div>
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
          {this.state.succeedAlert === true ? (
            <Alert
              severity="success"
              style={{
                backgroundColor: "#b3ffcc",
                fontSize: "16px",
              }}
            >
              <strong>{this.props.listproduct.productName}</strong> a été ajouté
              dans votre panier !!<strong> Vérifier</strong>
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
              Veuillez connecter tout d'abord s'il vous plaît —{" "}
              <Link to={"/connexion"}>Connecter-Vous !!</Link>
            </Alert>
          ) : (
            ""
          )}
          {/* / menu */}
          <section id="detail" style={{ backgroundColor: "#bd827000" }}>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <section id="detail" style={{ backgroundColor: "#bd82700e" }}>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {/* <div className="row"> */}
                    <p>&nbsp;</p>
                    <div className="col-md-6 ">
                      <div className="detail-area">
                        <img
                          className="imgdet"
                          src={this.props.listproduct.productImage}
                          alt=""
                        />

                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div className="detail-area">
                        <h4>{this.props.listproduct.productName}</h4>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>Couleur : {this.props.listproduct.color}</p>
                        <p>Taille : {this.props.listproduct.size}</p>
                        <p>
                          {" "}
                          Matière : {this.props.listproduct.materialOption}
                        </p>
                        <p>Prix : {this.props.listproduct.price} dt</p>

                        <p>&nbsp;</p>
                        <p> #{this.props.listproduct.selectedOption}</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <button
                          style={{
                            fontSize: "18px",
                          }}
                          type="submit"
                          className="mdi mdi-cart-plus btn_p"
                          onClick={() => {
                            this.handleAddToCart();
                          }}
                        >
                          Ajouter au panier
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </section>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    authToken: state.AuthReducer.authToken,
    authUser: state.AuthReducer.authUser,
    userId: state.AuthReducer.userId,
    listProducts: state.ProductReducer.listProducts,
    listproduct: state.ProductReducer.listproduct,
    cartList: state.CartReducer.cartList,
    countCartItems: state.CartReducer.countCartItems,
    favoriteList: state.FavorisReducer.favoriteList,
  };
}
export default connect(mapStateToProps, {
  getProducts,
  getProduct,
  addToCart,
  getCartList,
  getFavoriteList,
})(Details);
