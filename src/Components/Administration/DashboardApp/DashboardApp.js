import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./DashboardApp.scss";
import DashboardAppRoutes from "./DashboardAppRoutes";
import Navbar from "./Shared/Navbar";
import Sidebar from "./Shared/Sidebar";
import SettingsPanel from "./Shared/SettingsPanel";
import Footer from "./Shared/Footer";

class DashboardApp extends Component {
  state = {};
  componentDidMount() {
    this.onRouteChanged();
  }
  render() {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar /> : "";
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar /> : "";
    let SettingsPanelComponent = !this.state.isFullPageLayout ? (
      <SettingsPanel />
    ) : (
      ""
    );
    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : "";
    return (
      <div className="container-scroller">
        {navbarComponent}
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}
          <div className="main-panel">
            <div className="content-wrapper">
              <DashboardAppRoutes />
              {SettingsPanelComponent}
            </div>
            {footerComponent}
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {

    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [
      "/lecadre/administration/dashboard",
      "/table/produits",
      "/commandes/ordinaires",
      "/commandes/specifiques",
      "/clients/listeclients",
      "/orderdetails/",


      
    ];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: false,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.remove("full-page-wrapper");
        break;
      } else {
        this.setState({
          isFullPageLayout: true,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.add("full-page-wrapper");
      }
    }














  }
}

export default withRouter(DashboardApp);
