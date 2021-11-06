import React, { Component } from "react";
import ModalAddProduct from "./ModalAddProduct";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import {
  getProducts,
  deleteProduct,
  editProduct,
  addproduct,
  hideMessage,
  hideLicenceMessage,
  showProductMessage,
  showLicenceMessage,
  patchBestSales,
  deleteBestSales,
} from "../../../Redux/Actions/ProductAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

class ProductManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productImage: {},
      productName: "",
      price: "",
      color: "",
      size: "",
      selectedOption: "",
      materialOption: "",
      show: false,
      listProducts: [],
      listProduct: {},
      id: "",
      ProductCategory: [
        {
          label: "Tout",
          value: "Tout",
          id: 1,
        },
        {
          label: "Classique",
          value: "Classique",
          id: 2,
        },
        {
          label: "Moderne",
          value: "moderne",
          id: 3,
        },
        {
          label: "Cadre en bois",
          value: "Cadre en bois",
          id: 4,
        },
        {
          label: "Cadre en céramique",
          value: "Cadre en céramique",
          id: 5,
        },
      ],

      ProductMaterial: [
        {
          label: "Tout",
          value: "Tout",
          id: 1,
        },
        {
          label: "Bois",
          value: "Bois",
          id: 2,
        },
        {
          label: "Céramique",
          value: "Céramique",
          id: 3,
        },
      ],
      List: [],
      categoryFilter: "Tout",
      materialFilter: "Tout",
      productClass: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeproductImage = this.handleChangeproductImage.bind(this);
    this.ValueChange = this.ValueChange.bind(this);
    this.SelectChange = this.SelectChange.bind(this);
    this.handleChangeFilterMaterial =
      this.handleChangeFilterMaterial.bind(this);
    this.handleChangeFilterCategory =
      this.handleChangeFilterCategory.bind(this);
  }
  handleChangeFilterMaterial = (name) => (event) => {
    let List = [];
    if (
      this.state.categoryFilter !== "" &&
      this.state.categoryFilter !== "Tout"
    ) {
      List = this.state.productClass;
    } else {
      List = this.props.listProducts;
    }

    if (event.target.value === "Tout") {
      this.setState({
        [name]: event.target.value,
        listProducts: List,
      });
    } else {
      let listProducts = List.filter(
        (element) => element.materialOption === event.target.value
      );
      this.setState({
        [name]: event.target.value,
        listProducts,
      });
    }
  };
  handleChangeFilterCategory = (name) => (event) => {
    if (event.target.value === "Tout") {
      this.setState({
        listProducts: this.props.listProducts,
      });
    } else {
      let listProducts = this.props.listProducts.filter(
        (element) => element.selectedOption === event.target.value
      );
      this.setState({ listProducts, productClass: listProducts });
    }

    this.setState({
      [name]: event.target.value,
      materialFilter: "",
    });
  };

  handleModal(listProduct) {
    this.setState({ show: !this.state.show });
    this.setState({ id: listProduct.id });
    this.setState({ productImage: listProduct.productImage });
    this.setState({ productName: listProduct.productName });
    this.setState({ selectedOption: listProduct.selectedOption });
    this.setState({ price: Number(listProduct.price) });
    this.setState({ materialOption: listProduct.materialOption });
    this.setState({ color: listProduct.color });
    this.setState({ size: listProduct.size });
  }

  handleCloseModal() {
    this.setState({ show: !this.state.show });
  }
  ValueChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }
  SelectChange(event) {
    this.setState({
      materialOption: event.target.value,
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleChangeproductImage = (name) => (event) => {
    let file = event.target.files[0];
    this.setState({ productImage: file });
  };
  handleSubmit = async (id, event) => {
    //event.preventDefault();
    var productObject = {};

    productObject.productName = this.state.productName;
    productObject.selectedOption = this.state.selectedOption;
    productObject.price = Number(this.state.price);
    productObject.materialOption = this.state.materialOption;
    productObject.color = this.state.color;
    productObject.size = this.state.size;

    var object = {};
    object.file = this.state.productImage;
    object.fileName = this.state.productImage.name;

    const myNewFile = new File([object.file], object.fileName, {
      type: object.file.type,
    });

    let formadata = new FormData();
    formadata.append("file", myNewFile);
    formadata.append("upload_preset", "lecadreImages");
    if (!this.state.id) {
      axios
        .post(
          `https://api.cloudinary.com/v1_1/dnrgk8ncj/image/upload`,
          formadata,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.state.productImage = res.data.secure_url;
          productObject.productImage = res.data.secure_url;
          this.props.addproduct(productObject);
        })

        .catch((err) => {
        });
    } else {
      var listProduct = {};
      listProduct.id = this.state.id;
      listProduct.productName = this.state.productName;
      listProduct.selectedOption = this.state.selectedOption;
      listProduct.price = this.state.price;
      listProduct.materialOption = this.state.materialOption;
      listProduct.color = this.state.color;
      listProduct.size = this.state.size;

      var object = {};
      object.file = this.state.productImage;
      object.fileName = this.state.productImage.name;

      const myNewFile = new File([object.file], object.fileName, {
        type: object.file.type,
      });

      let formadata = new FormData();
      formadata.append("file", myNewFile);
      formadata.append("upload_preset", "lecadreImages");
      axios
        .post(
          `https://api.cloudinary.com/v1_1/dnrgk8ncj/image/upload`,
          formadata,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )

        .then((res) => {
          this.state.productImage = res.data.secure_url;
          listProduct.productImage = res.data.secure_url;

          this.props.editProduct(listProduct);
          this.props.getProducts();
        });
    }
    this.setState({ show: !this.state.show });
  };

  componentDidUpdate(previouProps) {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 2500);
    }
    if (previouProps.listProducts !== this.props.listProducts) {
      this.setState({ listProducts: this.props.listProducts });
    }
  }
  componentDidMount() {
    this.props.getProducts();
  }

  handleDelete(id, e) {
    this.props.deleteProduct(id);

    this.props.getProducts();
  }
  onConfirm = () => {
    this.props.hideLicenceMessage();
  };
  render() {
    const { alertMessage, showLicenceMessage } = this.props;

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Liste des produits </h3>
          <div class="d-flex justify-content-center">
            <div className="col-md-12">
              <TextField
                id="categoryFilter"
                name="categoryFilter"
                select
                value={this.state.categoryFilter}
                onChange={this.handleChangeFilterCategory("categoryFilter")}
                SelectProps={{}}
                label="Catégorie"
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                {this.state.ProductCategory.map((selectedOption) => (
                  <MenuItem
                    key={selectedOption.id}
                    value={selectedOption.label}
                  >
                    {selectedOption.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-md-12">
              <TextField
                id="materialFilter"
                name="materialFilter"
                select
                value={this.state.materialFilter}
                onChange={this.handleChangeFilterMaterial("materialFilter")}
                SelectProps={{}}
                label="Matière"
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                Catégorie
                {this.state.ProductMaterial.map((materialOption) => (
                  <MenuItem
                    key={materialOption.id}
                    value={materialOption.label}
                  >
                    {materialOption.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>

          <nav aria-label="breadcrumb">
            <button
              type="button"
              className="mdi mdi-plus-circle btn btn-gradient btn-fw"
              onClick={() => {
                this.handleModal({});
              }}
              style={{fontSize:"18px"}}
            >
              Ajouter un produit
            </button>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Image produit</th>
                        <th>Catégorie</th>
                        <th>Matière</th>
                        <th>Nom produit</th>
                        <th>Prix</th>
                        <th>Couleur</th>
                        <th>Taille</th>
                        <th style={{ textAlign: "center" }}>
                          Action sur les produits
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.listProducts.map((listProduct) => (
                        <tr key={listProduct.id}>
                          <td>
                            <img src={listProduct.productImage} alt="" />
                          </td>
                          <td> {listProduct.selectedOption} </td>
                          <td> {listProduct.materialOption}</td>
                          <td> {listProduct.productName} </td>
                          <td> {listProduct.price} DT</td>
                          <td> {listProduct.color} </td>
                          <td> {listProduct.size} </td>
                          <td style={{ textAlign: "center"}}>
                            <button
                              type="button"
                              className="mdi mdi-marker btn btn-gradient-success btn-sm"
                              onClick={() => this.handleModal(listProduct)}
                            >
                              Modifier
                            </button>
                            <button
                              type="button"
                              className="mdi mdi-delete btn btn-gradient-danger btn-sm"
                              onClick={(e) =>
                                this.handleDelete(listProduct.id, e)
                              }
                            >
                              Supprimer
                            </button>
                            {listProduct.tag ===false ?
                            // " Livrer" : " Déjà livré"}
                            <button
                              type="button"
                              className="mdi mdi-star  btn btn-inverse-danger btn-sm"
                              onClick={(e) =>
                                this.props.patchBestSales(listProduct.id, e)
                              }
                            ></button>
                            :
                            <button
                              type="button"
                              className="mdi mdi-star btn btn-success btn-sm"
                              onClick={(e) =>
                                this.props.deleteBestSales(listProduct.id, e)
                              }
                            ></button>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          <ModalAddProduct
            handleModal={this.handleModal}
            handleChange={this.handleChange}
            handleCloseModal={this.handleCloseModal}
            values={this.state}
            handleChangeproductImage={this.handleChangeproductImage}
            handleSubmit={this.handleSubmit}
            ValueChange={this.ValueChange}
            SelectChange={this.SelectChange}
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
    listProducts: state.ProductReducer.listProducts,
    showMessage: state.AuthReducer.showMessage,
    alertMessage: state.AuthReducer.alertMessage,
    showLicenceMessage: state.AuthReducer.showLicenceMessage,
    alertLicenceMessage: state.AuthReducer.alertLicenceMessage,
    result: state.ProductReducer.result,
  };
}
export default withRouter(
  connect(mapStateToProps, {
    getProducts,
    deleteProduct,
    editProduct,
    addproduct,
    hideMessage,
    hideLicenceMessage,
    showProductMessage,
    showLicenceMessage,
    patchBestSales,
    deleteBestSales,
  })(ProductManagement)
);
