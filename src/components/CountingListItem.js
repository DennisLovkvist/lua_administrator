import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './component.css';
import './StatusDropDown.css';

class CountingListItem extends Component {
   
    handleChange = (index,department,pallet_type,event) => {

        var n = parseInt(event.target.value);

        if(!isNaN(n))
        {
           this.props.UpdateCount(index,this.props.counting.counting_control_id,department,pallet_type,n);
        }
        else
        {
            this.props.UpdateCount(index,this.props.counting.counting_control_id,department,pallet_type,0);
        }
    }
    handleChangeDate = (index,department,pallet_type,event) => {

        
    }
    ChangeStatus = (event) => {

        return;
        this.props.ChangeStatus(this.props.counting.counting_control_id);
        
    }
    render() {

        const {status_name, customer_name,customer_number,created_date} = this.props.counting;
        var customer_name_adjusted = customer_name;
        if(customer_name.length > 20)
        {
            customer_name_adjusted = (customer_name.toString().substring(0,17) + "...");
        }

        return (
            <div id={"cell"}>    
                
                
                <li id={"cell_status"}>
                <div className={"status-dropdown"}>
                        <button className={"status-dropbtn"}>{status_name}</button>
                        <div className={"status-dropdown-content"}>
                            <button onClick={(e) => this.ChangeStatus(e)}>{"Påbörjad"}</button>
                            <button onClick={(e) => this.ChangeStatus(e)}>{"Skickad"}</button>
                            <button onClick={(e) => this.ChangeStatus(e)}>{"Godkänd"}</button>
                            <button onClick={(e) => this.ChangeStatus(e)}>{"Avslutad"}</button>
                        </div>
                    </div>
                </li>

                <li id={"cell_customer_name"}><p>{customer_name_adjusted}</p></li>
                <li id={"cell_customer_number"}>{customer_number}</li>
                <li id={"cell_created_date"}>{created_date}</li>

                <li id={"cell_count_dry"}><input type="tel" onChange={(e) => this.handleChange(0,1,1, e)} value={this.props.counting.counts[0]}/></li>
                <li id={"cell_count_dry"}><input type="tel" onChange={(e) => this.handleChange(1,1,2, e)} value={this.props.counting.counts[1]}/></li>
                <li id={"cell_count_dry"}><input type="tel" onChange={(e) => this.handleChange(2,1,3, e)} value={this.props.counting.counts[2]}/></li>
                <li id={"cell_count_dry"}><input type="tel" onChange={(e) => this.handleChange(3,1,4, e)} value={this.props.counting.counts[3]}/></li>


                <li id={"cell_count_cold"}><input type="tel" onChange={(e) => this.handleChange(4,2,1, e)} value={this.props.counting.counts[4]}/></li>
                <li id={"cell_count_cold"}><input type="tel" onChange={(e) => this.handleChange(5,2,2, e)} value={this.props.counting.counts[5]}/></li>
                <li id={"cell_count_cold"}><input type="tel" onChange={(e) => this.handleChange(6,2,3, e)} value={this.props.counting.counts[6]}/></li>
                <li id={"cell_count_cold"}><input type="tel" onChange={(e) => this.handleChange(7,2,4, e)} value={this.props.counting.counts[7]}/></li>

                <li id={"cell_count_frozen"}><input type="tel" onChange={(e) => this.handleChange(8,3,1, e)} value={this.props.counting.counts[8]}/></li>
                <li id={"cell_count_frozen"}><input type="tel" onChange={(e) => this.handleChange(9,3,2, e)} value={this.props.counting.counts[9]}/></li>
                <li id={"cell_count_frozen"}><input type="tel" onChange={(e) => this.handleChange(10,3,3, e)} value={this.props.counting.counts[10]}/></li>
                <li id={"cell_count_frozen"}><input type="tel" onChange={(e) => this.handleChange(11,3,4, e)} value={this.props.counting.counts[11]}/></li>

                <li id={"cell_count_global"}><input type="tel" onChange={(e) => this.handleChange(12,5,4, e)} value={this.props.counting.counts[12]}/></li>
                <li id={"cell_count_global"}><input type="tel" onChange={(e) => this.handleChange(13,5,5, e)} value={this.props.counting.counts[13]}/></li>
                <li id={"cell_count_global"}><input type="tel" onChange={(e) => this.handleChange(14,5,6, e)} value={this.props.counting.counts[14]}/></li>
                <li id={"cell_count_global"}><input type="tel" onChange={(e) => this.handleChange(15,5,7, e)} value={this.props.counting.counts[15]}/></li>

                {/*
                <li id={"cell_date"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.date_arrival}/></li>
                <li id={"cell_time"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.time_arrival}/></li>

                <li id={"cell_date"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.date_loading_start}/></li>
                <li id={"cell_time"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.time_loading_start}/></li>

                <li id={"cell_date"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.date_loading_end}/></li>
                <li id={"cell_time"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.time_loading_end}/></li>

                <li id={"cell_date"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.date_departure}/></li>
                <li id={"cell_time"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.time_departure}/></li>

                <li id={"cell_count_fill"}></li>
                */}
                
            </div>
        );
    }

  
}

CountingListItem.propTypes = {

    counting: PropTypes.object.isRequired
}


export default CountingListItem;
