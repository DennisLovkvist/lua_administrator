import React, { Component } from 'react';
import Common from '../Common';
import './component.css';

import { CSVLink, CSVDownload } from "react-csv";

class ControlBar extends Component {    
  
    constructor(props) {
        super(props);
        this.state = {
          search_term:"",
          date_start:Common.GetCurrentDateString(),
          date_end:Common.GetCurrentDateString()
        }
    }
    HandleChange = (event) => {
                
        this.setState({search_term : event.target.value});  

        this.props.Filter(event.target.value);
    };
    HandleChangeDateStart = (event) => {
                
        this.setState({date_start: event.target.value});  
    };
    HandleChangeDateEnd = (event) => {
                
        this.setState({date_end : event.target.value});  
    };
    HandleFetch = (event) => {
                
        this.props.FetchSource(this.state.date_start,this.state.date_end);
    };
    EnterNewCustomerForm = (event) => {
                
        this.props.EnterNewCustomerForm();
    };
    render() {

        

        return(
            <div className={"control_bar"}>
                <div>
                <h3>Filter</h3>
                <input type="tel" onChange={(e) => this.HandleChange(e)} value={this.state.search_term}></input>

                <h3>Startdatum</h3>
                <input type="tel" onChange={(e) => this.HandleChangeDateStart(e)} value={this.state.date_start}></input>

                <h3>Slutdatum</h3>
                <input type="tel" onChange={(e) => this.HandleChangeDateEnd(e)} value={this.state.date_end}></input>
                
                <button onClick={(e) => this.HandleFetch(e)}>Hämta</button>

                <CSVLink data={this.props.csvData} separator=";">Exportera</CSVLink>
                <button onClick={(e) => this.EnterNewCustomerForm(e)}>{"Ny kund"}</button>

                </div>
            </div>

        );
    }

  
}



export default ControlBar;
