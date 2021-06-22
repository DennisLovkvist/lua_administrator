import React, { Component } from 'react';
import './component.css';
import './NewCustomerForm.css';
import './StatusDropDown.css';
//import checkmark from './checkmark.png';



class NewCustomerForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          name:"",
          max_height:1.4
        }
    }

    handleChange = (event) => {

        this.setState({  name: event.value},)
    }
    ChangeMaxHeight = (event, height) => {

        this.setState({  max_height: height});
    }
    ChangeMaxHeight = (event, height) => {

        this.setState({  max_height: height});
    }
    Exit = (event) => {

        this.props.ExitNewCustomerForm();
    }
    render() {
    
        var valid_name = (true) ? "V":"X";
        var valid_number = (false) ? "V":"X";
    
        return (
        <div> 
            <div id={"form-small"}>
                <div className={"form-title"}>
                <h1>LUA Administrator</h1>
                

            </div>
            </div>
            <div id={"form-large"}>

                <div className={"form-title"}>
                    <h1>Ny Kund</h1>
                    </div>
                <div className={"form-customer-name"}>
                    <p>Butiksnamn:&nbsp;&nbsp;</p>
                    <input type="text" onChange={(e) => this.handleChange(e)} value={this.state.name}/>   
                    <p>{valid_name}</p>
                </div> 
                <div className={"form-customer-number"}>
                    <div>
                    <p>Kundnummer:</p>
                    <input type="text" onChange={(e) => this.handleChange(e)} value={this.state.name}/> 
                    <p>{valid_number}</p>   
                    </div>
                    <div>
                    <div><p>Max höjd:</p></div>            
                    <div className={"status-dropdown"}>
                        <button className={"status-dropbtn"}>{this.state.max_height}</button>
                        <div className={"status-dropdown-content"}>
                            <button onClick={(e) => this.ChangeMaxHeight(e,1.4)}>{"1.4"}</button>
                            <button onClick={(e) => this.ChangeMaxHeight(e,1.6)}>{"1.6"}</button>
                            <button onClick={(e) => this.ChangeMaxHeight(e,1.8)}>{"1.8"}</button>
                        </div>
                    </div>
                    </div>
                </div> 
                <div className={"form-save"}>  
                    <button onClick={(e) => this.Exit(e,false)}>{"Avbryt"}</button>
                    <button onClick={(e) => this.Exit(e,true)}>{"Spara"}</button>
                </div>
            </div>
        </div> 
        );
    
    
        
    }

}
  
export default NewCustomerForm;