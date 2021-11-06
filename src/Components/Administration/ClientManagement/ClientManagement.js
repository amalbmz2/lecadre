import React, { Component } from "react";
import { getclients } from "../../../Redux/Actions/ClientManagementAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ClientManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClients: [],
    };
  }
  componentDidMount() {
    this.props.getclients();
  }
  render() {
    return (
      <div >
        <div className="page-header" >
          <h3 className="page-title"> Liste des clients </h3>
        </div>
        <div className="row">
          <div className="col-lg-12 stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                  
                  >
                    <thead>
                      <tr>
                        {/* <th> ID client</th> */}
                        <th> Nom </th>
                        <th> Prénom </th>
                        <th> Adresse email </th>
                      </tr>
                    </thead>
                    <tbody >
                      {this.props.listClients.map((ListUser) => (
                        <tr key={ListUser.id} className="table"   style={{
                      backgroundColor: "#D7B4A9",
                    }}>
                          {/* <td>{ListUser.id}</td> */}
                          <td> {ListUser.firstName} </td>
                          <td>{ListUser.lastName}</td>
                          <td> {ListUser.email} </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    listClients: state.ClientManagementReducer.listClients,
  };
}
export default withRouter(
  connect(mapStateToProps, {
    getclients,
  })(ClientManagement)
);
