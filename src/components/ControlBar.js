import React, { Component } from 'react';
import Common from '../Common';
import './component.css';

import { CSVLink} from "react-csv";

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
    HandleCheckbox = (event,index) => {
                
        this.props.ChangeRouteFilter(index, event.target.checked);
        
    };
    render() {

        

        return(
            <div className={"control_bar"}>
                <div>
                    <div className={"control_bar_default"}>
                        <h3>Filter</h3>
                        <input type="tel" onChange={(e) => this.HandleChange(e)} value={this.state.search_term}></input>                        
                    </div>

                    <div className={"control_bar_routes"}>
                        <h4>Tumba</h4>
                        <input type="checkbox" id={"checkbox_tumba"} defaultChecked={true} onClick={(e) => this.HandleCheckbox(e,0)}></input>
                        
                        <h4>A-tur</h4>
                        <input type="checkbox" id={"checkbox_tumba"} defaultChecked={true} onClick={(e) => this.HandleCheckbox(e,1)}></input>

                        <h4>E-tur</h4>
                        <input type="checkbox" id={"checkbox_tumba"} defaultChecked={true} onClick={(e) => this.HandleCheckbox(e,2)}></input>
                    </div>

                    <div className={"control_bar_fetch"}>
                        <h3>Startdatum</h3>
                        <input type="tel" onChange={(e) => this.HandleChangeDateStart(e)} value={this.state.date_start}></input>

                        <h3>Slutdatum</h3>
                        <input type="tel" onChange={(e) => this.HandleChangeDateEnd(e)} value={this.state.date_end}></input>
                        
                        <button onClick={(e) => this.HandleFetch(e)}>Hämta</button>
                    </div>
                    <div className={"control_bar_default"}>
                        <CSVLink data={this.props.csvData} separator=";">Exportera</CSVLink>
                        <button onClick={(e) => this.EnterNewCustomerForm(e)}>{"Ny kund"}</button>
                    </div>
                </div>
            </div>

        );
    }

  
}



export default ControlBar;
