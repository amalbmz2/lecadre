import React, { Component } from "react";

export default class PersonalProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
            <div className="aa-header-top">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="aa-header-top-area">
                      <div className="aa-header-top-right">
                        <ul className="aa-head-top-nav-right">
                          <li>
                            <a
                              style={{
                                color: "black",
                                textDecoration: "none",
                              }}
                              href="/"
                            >
                              Accueil
                            </a>
                          </li>
                          <li>
                            <a
                              style={{
                                color: "black",
                                textDecoration: "none",
                              }}
                              href="/connexion"
                              //data-toggle="modal" data-target="#login-modal"
                            >
                              Connexion
                            </a>
                          </li>
                          <li>
                            <a
                              style={{
                                color: "black",
                                textDecoration: "none",
                              }}
                              href="/inscription"
                              // data-toggle="modal" data-target="#login-modal"
                            >
                              Inscription
                            </a>
                          </li>
                        </ul>
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
                    <div className="aa-header-bottom-area">
                      {/* logo  */}
                      <div className="aa-logo">
                        {/* Text based logo */}
                        <a href="index.html">
                          <p>logo </p>
                        </a>
                        {/* img based logo */}
                        {/* <a href="index.html"><img src="img/logo.jpg" alt="logo img"></a> */}
                      </div>
                      {/* / logo  */}
                      {/* cart box */}
                      <div className="aa-cartbox">
                        <div className="aa-cart-link">
                          <a href="#">
                            <img
                              style={{
                                width: "50px",
                                height: "40px",
                                paddingRight: "10px",
                                marginTop: "15px",
                              }}
                              src="assets/img/passion.png"
                              alt=""
                            />
                          </a>
                          <a href="/panier">
                            <img
                              style={{
                                width: "50px",
                                height: "40px",
                                paddingLeft: "10px",
                                marginTop: "15px",
                              }}
                              src="assets/img/shopping-cart.png"
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                    <p>&nbsp;</p>
                  </div>
                </div>
              </div>
            </div>
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
          {/* / menu */}
          <section id="detail" style={{ backgroundColor: "#bd827000" }}>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <section id="detail" style={{ backgroundColor: "#bd82700e" }}>
              <div className="container d-flex align-items-start">
                <div className="row ">
                  <div className="col-md-12 ">
                    {/* <div className="row"> */}
                    <p>&nbsp;</p>
                    <div className="col-md-6 ">
                      <div className="detail-area">
                        <img
                          style={{
                            width: "750px",
                            height: "400px",
                            paddingBottom: "10px",
                          }}
                          className="imgdet"
                          src="assets/img/bbbois.jpg"
                          alt=""
                        />
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="detail-area">
                        <h5
                          style={{
                            color: "#BD8270",
                            fontSize: "30px",
                            width: "230px",
                          marginLeft: "85px"
                          }}
                        >
                          Tableau
                        </h5>
                        <p>&nbsp;</p>

                        <form
                          style={{
                            marginLeft: "420px",
                          }}
                        >
                          <div>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="Classique"
                            />
                            <label
                              style={{
                                height: "100%",
                                marginLeft: "20px",
                                fontSize: "18px",
                                color: "#6b6d6dc2",
                              }}
                              className="form-check-label "
                              htmlFor="inlineRadio1"
                            >
                              Standard(50cm*40cm)
                            </label>
                          </div>
                        </form>
                        <p>&nbsp;</p>
                        <div class="d-flex">
                          <div
                            class="p-2"
                            style={{ marginRight: "50px", 
                            marginLeft: "85px" 
                            }}
                          >
                            <div>
                              <select
                                style={{
                                  border: "1px solid#BD8270",
                                  borderRadius: "50px",
                                  fontSize: "20px",
                                  height: "50px",
                                  marginBottom: "20px",
                                  width: "230px",
                                  color: "#6b6d6dc2",
                                }}
                              >
                                <option value="0">Matière:</option>
                                <option value="1">Bois</option>
                                <option value="2">Céramique</option>
                              </select>
                            </div>
                            <div className="aa-sidebar-widget"></div>

                            <div>
                              <select
                                style={{
                                  border: "1px solid#BD8270",
                                  borderRadius: "50px",
                                  fontSize: "20px",
                                  height: "50px",
                                  marginBottom: "20px",
                                  width: "230px",
                                  color: "#6b6d6dc2",
                                }}
                              >
                                <option value="0">Couleur:</option>
                                <option value="1">Noir</option>
                                <option value="2">Gris</option>
                                <option value="3">Bleu</option>
                                <option value="4">Rouge</option>
                                <option value="5">Vert</option>
                                <option value="6">Marron</option>
                                <option value="7">Rose</option>
                                <option value="8">Blanc</option>
                                <option value="9">naturel</option>
                              </select>
                            </div>
                          </div>
                          <div
                            style={{
                              borderLeft: "1px outset #BD8270",
                              marginRight: "40px",
                            }}
                          ></div>
                          <div class="ml-auto p-2">
                            <input
                              style={{
                                backgroundColor:"#dcdcdc",
                                border: "1px solid#BD8270",
                                borderRadius: "50px",
                                fontSize: "20px",
                                height: "50px",
                                marginBottom: "20px",
                                width: "230px",
                                color: "#6b6d6dc2",
                              }}
                              placeholder="  Hauteur (cm)"
                            />

                            <input
                              style={{
                                backgroundColor:"#dcdcdc",
                                border: "1px solid#BD8270",
                                borderRadius: "50px",
                                fontSize: "20px",
                                height: "50px",
                                marginBottom: "20px",
                                width: "230px",
                                color: "#6b6d6dc2",
                              }}
                              placeholder="  Largeur (cm)"
                            />
                          </div>
                        </div>
                        <p>&nbsp;</p>
                        <h2
                          style={{
                            fontSize: "20px",
                            height: "50px",
                            marginBottom: "20px",
                            width: "230px",
                            color: "#6b6d6dc2",
                            marginLeft: "85px",
                          }}
                        >
                          Prix: 12 DT
                        </h2>
                        <button type="submit" className="btn_p">
                          Ajouter au panier
                        </button>
                      </div>
                    </div>
                    {/* </div> */}
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
