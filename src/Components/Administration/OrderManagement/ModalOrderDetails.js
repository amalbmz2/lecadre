import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  patchShippingStatus,
} from "../../../Redux/Actions/OrderAction";

class ModalOrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Modal
        show={this.props.values.show}
        onHide={() => this.props.handleCloseModal()}
      >
        <Modal.Header
          closeButton
          style={{ fontSize: "25px", color: "black" }}
        >
          {" "}
          Détails du commande
        </Modal.Header>
        <Modal.Body>
          <div
            className="row"
            style={{
              color: "gray",
            }}
          >
            <div className="col-md-12 grid-margin">
              <div className="card">
                <div className="card-description">
                  &nbsp;
                  <p style={{ color: "#BD8270", fontSize: "18px" }}>
                    {" "}
                    &nbsp;Informations de livraison :
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    &nbsp;Adresse : {this.props.values.adress}
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    &nbsp;Numéro téléphone : {this.props.values.tel}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 grid-margin">
              <div className="card">
                <div className="card-description"></div>
                <p style={{ color: "#BD8270", fontSize: "18px" }}>
                  {" "}
                  &nbsp;Produits commandés :
                </p>
                {this.props.values.products.map((product) => (
                  <figure className="col-md-4" key={product.id}>
                    <img
                      style={{
                        width: "300px",
                        height: "290px",
                        paddingBottom: "10px",
                      }}
                      src={product.productImage}
                      alt=""
                    />
                    <figcaption>
                      <h4 className="aa-product-title">
                        {product.productName}
                      </h4>
                      <p>
                        {product.quantity} pièce(s): {product.price} dt
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
          <p
            style={{
              color: "black",
              fontSize: "18px",
            }}
          >
            {" "}
            Prix total :
            {this.props.values.products.reduce(
              (a, c) => a + c.price * c.quantity,
              0
            )}{" "}
            DT
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="mdi mdi-file-check btn-icon-prepend btn btn-icon-text btn-sm"
            onClick={this.props.handleSubmit}
            style={{backgroundColor: "#D7B4A9",color:"white"}}
          >
            &nbsp; {this.props.values.livred ===false ? " Livrer" : " Déjà livré"}
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
  };
}
export default connect(mapStateToProps, {
  patchShippingStatus,
})(ModalOrderDetails);
