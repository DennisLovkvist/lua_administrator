import React, { Component } from 'react';

class CountingListHeader extends Component {    
  
    handleClick = (e,sort_by) => {
        
        this.props.Sort(sort_by);
    };

    render() {

        return(
            <div>
                <ul id={"counting_view_list"}>
                    <div className={"counting_view"}>

                            <li id={"cell_header_store"}>Information</li>
                            <li id={"cell_header_dry"}>Kolonial</li>
                            <li id={"cell_header_cold"}>Kylt</li>
                            <li id={"cell_header_frozen"}>Fryst</li>
                            <li id={"cell_header_global"}>Global</li>

                    </div>
                </ul>
                <ul id={"counting_view_list"}>
                    <div className={"counting_view"}>

                            <li id={"cell_header_status"}><a href="#" id={"cell_header_status"} onClick={(e) => this.handleClick(e,"status")}>Status</a></li>
                            <li id={"cell_header_customer_name"}><a href="#" id={"cell_header_status"} onClick={(e) => this.handleClick(e,"name")}>Kund</a></li>
                            <li id={"cell_header_customer_number"}><a href="#" id={"cell_header_status"} onClick={(e) => this.handleClick(e,"number")}>Kundnr</a></li>
                            <li id={"cell_header_created_date"}><a href="#" id={"cell_header_created_date"} onClick={(e) => this.handleClick(e,"date")}>Datum</a></li>

                            <li id={"cell_header_count_dry"}><p>PPL</p></li>
                            <li id={"cell_header_count_dry"}><p>P</p></li>
                            <li id={"cell_header_count_dry"}><p>HP</p></li>
                            <li id={"cell_header_count_dry"}><p>S</p></li>

                            <li id={"cell_header_count_cold"}><p>PPL</p></li>
                            <li id={"cell_header_count_cold"}><p>P</p></li>
                            <li id={"cell_header_count_cold"}><p>HP</p></li>
                            <li id={"cell_header_count_cold"}><p>S</p></li>

                            <li id={"cell_header_count_frozen"}><p>PPL</p></li>
                            <li id={"cell_header_count_frozen"}><p>P</p></li>
                            <li id={"cell_header_count_frozen"}><p>HP</p></li>
                            <li id={"cell_header_count_frozen"}><p>S</p></li>

                            <li id={"cell_header_count_global"}><p>Trä</p></li>
                            <li id={"cell_header_count_global"}><p>Grå</p></li>
                            <li id={"cell_header_count_global"}><p>Chep</p></li>
                            <li id={"cell_header_count_global"}><p>Röd</p></li>

                            <li id={"cell_header_count_fill"}></li>

                    </div>
                </ul>
            </div>

        );
    }

  
}



export default CountingListHeader;
