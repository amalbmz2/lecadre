import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { OutlinedInput } from "@material-ui/core";

export default class ModalAddProduct extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      
      <Modal
        show={this.props.values.show}
        onHide={() => this.props.handleCloseModal()}
      >
        <Modal.Header closeButton style={{ fontSize: "25px" }} className="text-danger">
          {" "}
          Créer un produit
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="p-2">
              <label
                htmlFor="DateEntretien"
                className="form-label"
                style={{ fontSize: "16px" }}
              >
                Veuillez saisir les détails du produit en spécifiant son
                image
                <br></br>
                <br></br>
              </label>
              <OutlinedInput
                variant="outlined"
                productImage={this.props.values.productImage}
                onChange={this.props.handleChangeproductImage("file")}
                margin="normal"
                fullWidth
                name="productImage"
                type="file"
                id="productName"
                autoComplete="current-productImage"
              />

              <br />
              <br />
              <form>
                <div className="text-info">Catégorie : {this.props.values.selectedOption}</div>
                <div
                  style={{
                    height: "100%",
                    marginTop: "20px",
                    marginLeft: "22px",
                    fontSize: "14px",
                  }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="Classique"
                    checked={this.props.values.selectedOption === "Classique"}
                    onChange={this.props.ValueChange}
                  />
                  <label className="form-check-label " htmlFor="inlineRadio1">
                    Classique
                  </label>
                </div>
                <div
                  style={{
                    height: "100%",
                    marginTop: "20px",
                    marginLeft: "22px",
                    fontSize: "14px",
                  }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="Moderne"
                    checked={this.props.values.selectedOption === "Moderne"}
                    onChange={this.props.ValueChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Moderne
                  </label>
                </div>
                <div
                  style={{
                    height: "100%",
                    marginTop: "20px",
                    marginLeft: "22px",
                    fontSize: "14px",
                  }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="Cadre en bois"
                    checked={
                      this.props.values.selectedOption === "Cadre en bois"
                    }
                    onChange={this.props.ValueChange}
                  />
                  <label className="form-check-label " htmlFor="inlineRadio3">
                    Cadre en bois
                  </label>
                </div>
                <div
                  style={{
                    height: "100%",
                    marginTop: "20px",
                    marginLeft: "22px",
                    fontSize: "14px",
                  }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio4"
                    value="Cadre en céramique"
                    checked={
                      this.props.values.selectedOption === "Cadre en céramique"
                    }
                    onChange={this.props.ValueChange}
                  />
                  <label className="form-check-label " htmlFor="inlineRadio4">
                    Cadre en céramique
                  </label>
                </div>
                <br />
                <br />
              </form>

              <div className="text-info">Matière : {this.props.values.materialOption}</div>
              <div
                style={{
                  height: "100%",
                  marginTop: "20px",
                  marginLeft: "22px",
                  fontSize: "14px",
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions2"
                  id="inlineRadio5"
                  value="Bois"
                  checked={this.props.values.materialOption === "Bois"}
                  onChange={this.props.SelectChange}
                />
                <label className="form-check-label " htmlFor="inlineRadio5">
                  Bois
                </label>
              </div>
              <div
                style={{
                  height: "100%",
                  marginTop: "20px",
                  marginLeft: "22px",
                  fontSize: "14px",
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions2"
                  id="inlineRadio6"
                  value="Céramique"
                  checked={this.props.values.materialOption === "Céramique"}
                  onChange={this.props.SelectChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio6">
                  Céramique
                </label>
              </div>

              <TextField
                variant="outlined"
                value={this.props.values.productName || ""}
                onChange={this.props.handleChange("productName")}
                margin="normal"
                required
                fullWidth
                name="productName"
                label="Nom produit"
                type="productName"
                id="productName"
                autoComplete="current-productName"
              />
              <TextField
                variant="outlined"
                value={this.props.values.price}
                onChange={this.props.handleChange("price")}
                margin="normal"
                required
                fullWidth
                name="price"
                label="Prix"
                type="number"
                id="price"
                autoComplete="current-price"
              />
              <TextField
                variant="outlined"
                value={this.props.values.color || ""}
                onChange={this.props.handleChange("color")}
                margin="normal"
                required
                fullWidth
                name="color"
                label="Couleur"
                type="string"
                id="color"
                autoComplete="current-color"
              />
              <TextField
                variant="outlined"
                value={this.props.values.size || ""}
                onChange={this.props.handleChange("size")}
                margin="normal"
                required
                fullWidth
                name="size"
                label="Taille"
                type="size"
                id="size"
                autoComplete="current-size"
                placeholder="60cm*50cm"
              />
            </div>
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="mdi mdi-file-check btn btn-danger"
            onClick={this.props.handleSubmit}
          >
            {this.props.values.id ? " Mettre à jour" : " Créer"}
          </button>
          {/* <button
            className="mdi mdi-close btn btn-danger"
            onClick={() => {
              this.props.handleCloseModal();
            }}
          >
          &nbsp;Fermer
          </button> */}
        </Modal.Footer>
      </Modal>
    );
  }
}
