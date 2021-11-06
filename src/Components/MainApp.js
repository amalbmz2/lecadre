import React, { Component } from 'react';
import DashboardApp from './Administration/DashboardApp/DashboardApp';
export default class MainApp extends Component {
    render() {
        
        return (
            <div className="MainApp">
                <div id="wpf-loader-two">
          <div className="wpf-loader-two-inner">
            <span></span>
          </div>
        </div>
                <DashboardApp/>
                
            </div>
        )
    }
}

