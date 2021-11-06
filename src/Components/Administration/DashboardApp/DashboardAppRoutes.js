import React, { Component, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Spinner from "./Shared/Spinner";

const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const Login = lazy(() => import("./AdminPages/SignIn"));
const ForgetPassword = lazy(() => import("./AdminPages/ForgetPassword"));
const ProductList = lazy(() =>
  import("../ProductManagement/ProductManagement")
);
const orderList = lazy(() => import("../OrderManagement/OrderManagement"));
const specificOrderList = lazy(() =>
  import("../OrderManagement/SpecificOrderManagement")
);
const clientList = lazy(() => import("../ClientManagement/ClientManagement"));
const orderDetails = lazy(() => import("../OrderManagement/ModalOrderDetails"));
const home = lazy(() => import("../../Home/HomePage"));
const details = lazy(() => import("../../ProductDetails/Details"));
const connexion = lazy(() => import("../../ClientAuthentification/Connexion"));
const inscription = lazy(() =>
  import("../../ClientAuthentification/Inscription")
);
const classicProducts = lazy(() =>
  import("../../ProductCategoryPages/ClassicCategory")
);
const allProducts = lazy(() =>
  import("../../ProductCategoryPages/AllCategory")
);
const modernProducts = lazy(() =>
  import("../../ProductCategoryPages/ModernCategory")
);
const woodProducts = lazy(() =>
  import("../../ProductCategoryPages/WoodCategory")
);
const ceramicProducts = lazy(() =>
  import("../../ProductCategoryPages/CeramicCategory")
);
const bestProducts = lazy(() =>
  import("../../ProductCategoryPages/BestProducts")
);
const personalproductdetails = lazy(() =>
  import("../../ProductDetails/PersonalProductDetails")
);
const cart = lazy(() => import("../../Cart/Cart"));
const favoris = lazy(() => import("../../Favoris/Favoris"));

class DashboardAppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={home} />
          <Route path="/lecadre/administration/login" component={Login} />
          <Route
            path="/lecadre/administration/dashboard"
            component={Dashboard}
          />
          <Route
            path="/lecadre/administation/forgetpassword"
            component={ForgetPassword}
          />
          <Route path="/table/produits" component={ProductList} />
          <Route path="/commandes/ordinaires" component={orderList} />
          <Route path="/commandes/specifiques" component={specificOrderList} />
          <Route path="/clients/listeclients" component={clientList} />
          <Route path="/orderdetails/" component={orderDetails} />
          <Route path="/details:classId" component={details} />
          <Route path="/connexion" component={connexion} />
          <Route path="/inscription" component={inscription} />
          <Route path="/classiques" component={classicProducts} />
          <Route path="/tous" component={allProducts} />
          <Route path="/modernes" component={modernProducts} />
          <Route path="/enbois" component={woodProducts} />
          <Route path="/céramiques" component={ceramicProducts} />
          <Route path="/meilleurs" component={bestProducts} />
          <Route path="/personalisés" component={personalproductdetails} />
          <Route path="/panier" component={cart} />
          <Route path="/favoris" component={favoris} />
        </Switch>
      </Suspense>
    );
  }
}

export default DashboardAppRoutes;
