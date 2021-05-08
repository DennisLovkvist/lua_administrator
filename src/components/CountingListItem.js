import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './component.css';

class CountingListItem extends Component {
   
    handleChange = (index,department,pallet_type,event) => {

        var n = parseInt(event.target.value);

        if(!isNaN(n))
        {
           this.props.UpdateCount(index,this.props.counting.counting_control_id,department,pallet_type,n);
        }
    }
    handleChangeDate = (index,department,pallet_type,event) => {

        
    }
    ChangeStatus = (event) => {

        this.props.ChangeStatus(this.props.counting.counting_control_id);
        
    }
    render() {

        const {status_name, customer_name,customer_number,created_date} = this.props.counting;
        return (
            <div>    
                
                <li id={"cell_status"}><button onClick={(e) => this.ChangeStatus(e)}>{status_name}</button></li>
                <li id={"cell_customer_name"}>{customer_name}</li>
                <li id={"cell_customer_number"}>{customer_number}</li>
                <li id={"cell_created_date"}>{created_date}</li>

                <li id={"cell_count_dry"}><input type="tel" onChange={(e) => this.handleChange(0,1,1, e)} value={this.props.counting.counts[0]}/></li>
                <li id={"cell_count_dry"}><input type="tel" onChange={(e) => this.handleChange(1,2,1, e)} value={this.props.counting.counts[1]}/></li>
                <li id={"cell_count_dry"}><input type="tel" onChange={(e) => this.handleChange(2,3,1, e)} value={this.props.counting.counts[2]}/></li>
                <li id={"cell_count_dry"}><input type="tel" onChange={(e) => this.handleChange(3,4,1, e)} value={this.props.counting.counts[3]}/></li>


                <li id={"cell_count_cold"}><input type="tel" onChange={(e) => this.handleChange(4,1,2, e)} value={this.props.counting.counts[4]}/></li>
                <li id={"cell_count_cold"}><input type="tel" onChange={(e) => this.handleChange(5,2,2, e)} value={this.props.counting.counts[5]}/></li>
                <li id={"cell_count_cold"}><input type="tel" onChange={(e) => this.handleChange(6,3,2, e)} value={this.props.counting.counts[6]}/></li>
                <li id={"cell_count_cold"}><input type="tel" onChange={(e) => this.handleChange(7,4,2, e)} value={this.props.counting.counts[7]}/></li>

                <li id={"cell_count_frozen"}><input type="tel" onChange={(e) => this.handleChange(8,1,3, e)} value={this.props.counting.counts[8]}/></li>
                <li id={"cell_count_frozen"}><input type="tel" onChange={(e) => this.handleChange(9,2,3, e)} value={this.props.counting.counts[9]}/></li>
                <li id={"cell_count_frozen"}><input type="tel" onChange={(e) => this.handleChange(10,3,3, e)} value={this.props.counting.counts[10]}/></li>
                <li id={"cell_count_frozen"}><input type="tel" onChange={(e) => this.handleChange(11,4,3, e)} value={this.props.counting.counts[11]}/></li>

                <li id={"cell_count_global"}><input type="tel" onChange={(e) => this.handleChange(12,5,4, e)} value={this.props.counting.counts[12]}/></li>
                <li id={"cell_count_global"}><input type="tel" onChange={(e) => this.handleChange(13,5,5, e)} value={this.props.counting.counts[13]}/></li>
                <li id={"cell_count_global"}><input type="tel" onChange={(e) => this.handleChange(14,5,6, e)} value={this.props.counting.counts[14]}/></li>
                <li id={"cell_count_global"}><input type="tel" onChange={(e) => this.handleChange(15,5,7, e)} value={this.props.counting.counts[15]}/></li>

                <li id={"cell_date"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.date_arrival}/></li>
                <li id={"cell_time"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.time_arrival}/></li>

                <li id={"cell_date"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.date_loading_start}/></li>
                <li id={"cell_time"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.time_loading_start}/></li>

                <li id={"cell_date"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.date_loading_end}/></li>
                <li id={"cell_time"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.time_loading_end}/></li>

                <li id={"cell_date"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.date_departure}/></li>
                <li id={"cell_time"}><input type="tel" onChange={(e) => this.handleChangeDate(e)} value={this.props.counting.time_departure}/></li>

                <li id={"cell_count_fill"}></li>
                
            </div>
        );
    }

  
}

CountingListItem.propTypes = {

    counting: PropTypes.object.isRequired
}


export default CountingListItem;
