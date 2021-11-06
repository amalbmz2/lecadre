import React, { Component } from "react";
import ModalOrderDetails from "./ModalOrderDetails";
import { connect } from "react-redux";
import {
  getOrders,
  patchShippingStatus,
  showOrderMessage,
  hideOrderMessage,
  hideOrderLicenceMessage,
  showOrderLicenceMessage,
} from "../../../Redux/Actions/OrderAction";

import SweetAlert from "react-bootstrap-sweetalert";

class OrderManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      firstName: "",
      lastName: "",
      livred: false,
      adress: "",
      tel: "",
      products: [],
      id: "",
      orderList: [],
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCloseModal() {
    this.setState({ show: !this.state.show });
  }
  componentDidMount() {
    this.props.getOrders();
  }
  handleModal(orderItem) {
    this.setState({ show: !this.state.show });
    this.setState({ id: orderItem.id });
    this.setState({ firstName: orderItem.firstName });
    this.setState({ lastName: orderItem.lastName });
    this.setState({ livred: orderItem.livred });
    this.setState({ adress: orderItem.adress });
    this.setState({ tel: Number(orderItem.tel) });
    this.setState({ products: orderItem.products });
  }
  componentDidUpdate(previouProps) {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideOrderMessage();
      }, 2500);
    }
    if (previouProps.orderList !== this.props.orderList) {
      this.setState({ orderList: this.props.orderList });
    }
  }

  handleSubmit() {
    this.props.patchShippingStatus(this.state.id);
    this.setState({ show: !this.state.show });
  }

  render() {
    const { alertMessage, showLicenceMessage } = this.props;

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Commandes ordinaires </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Commandes
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Commandes ordinaires
              </li>
            </ol>
          </nav>
        </div>

        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th style={{ fontSize: "15px" }}>Nom client</th>
                      <th style={{ fontSize: "15px" }}>Prénom client</th>
                      <th style={{ fontSize: "15px" }}>Livré ?</th>
                      <th style={{ fontSize: "15px" }}>Détails commande</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.orderList.map((orderItem) => (
                      <tr key={orderItem.id}>
                        <td> {orderItem.firstName}</td>
                        <td> {orderItem.lastName}</td>
                        <td>
                          {orderItem.livred === false ? (
                            <label
                              style={{ fontSize: "15px" }}
                              className="badge badge-danger"
                            >
                              Non
                            </label>
                          ) : (
                            <label
                              style={{ fontSize: "15px" }}
                              className="badge badge-success"
                            >
                              Oui
                            </label>
                          )}
                        </td>
                        <td>
                          <button
                            className=" btn-sm"
                            style={{
                              marginLeft: "26px",
                              fontSize: "15px",
                              backgroundColor: "#D7B4A9",
                              color:"white"
                            }}
                            onClick={() => {
                              this.handleModal(orderItem);
                            }}
                          >
                            Détails
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {
          <ModalOrderDetails
            handleModal={this.handleModal}
            handleChange={this.handleChange}
            handleCloseModal={this.handleCloseModal}
            handleLivraison={this.handleLivraison}
            values={this.state}
            handleSubmit={this.handleSubmit}
          />
        }
        {this.props.showMessage === true ? (
          <SweetAlert
            success
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
    orderList: state.OrderReducer.orderList,
    showMessage: state.OrderReducer.showMessage,
    alertMessage: state.OrderReducer.alertMessage,
    showLicenceMessage: state.OrderReducer.showLicenceMessage,
    alertLicenceMessage: state.OrderReducer.alertLicenceMessage,
  };
}
export default connect(mapStateToProps, {
  getOrders,
  patchShippingStatus,
  showOrderMessage,
  hideOrderMessage,
  hideOrderLicenceMessage,
  showOrderLicenceMessage,
})(OrderManagement);
