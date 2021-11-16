import React, { Component } from 'react';

class CountingListHeader extends Component {    
  
    handleClick = (e,sort_by) => {
                
        this.props.Filter(this.props.search_term,this.props.sort_category,!this.props.sort_desc);
    };

    

    render() {
                
        var arrow_status = "";
        var arrow_number = "";
        var arrow_name = "";
        var arrow_date = "";

        if(this.props.sort_category == "status")
        {
            arrow_status = (this.props.sort_desc ? "▼":"▲")
        }
        else if(this.props.sort_category == "date")
        {
            arrow_date = (this.props.sort_desc ? "▼":"▲")
        }
        else if(this.props.sort_category == "number")
        {
            arrow_number = (this.props.sort_desc ? "▼":"▲")
        }
        else if(this.props.sort_category == "name")
        {
            arrow_name = (this.props.sort_desc ? "▼":"▲")
        }

        return(
            <div>
                <ul id={"counting_view_list"}>
                    <div className={"counting_view"}>

                            <li id={"cell_header_store"}>Information</li>
                            <li id={"cell_header_dry"}>Kolonial</li>
                            <li id={"cell_header_cold"}>Kylt</li>
                            <li id={"cell_header_frozen"}>Fryst</li>
                            <li id={"cell_header_global"}>Global</li>
                            <li id={"cell_header_date_control"}>Tid</li>
                            <li id={"cell_header_date_control_add"}>{"+"}</li>
                    </div>
                </ul>
                <ul id={"counting_view_list"}>
                    <div className={"counting_view"}>

                            <li id={"cell_header_status"}><a href="#" onClick={(e) => this.handleClick(e,"status")}>{"Status"}</a><p>{arrow_status}</p></li>
                            <li id={"cell_header_customer_name"}><a href="#" onClick={(e) => this.handleClick(e,"name")}>{"Kund"}</a><p>{arrow_name}</p></li>
                            <li id={"cell_header_customer_number"}><a href="#"onClick={(e) => this.handleClick(e,"number")}>{"Kundnr"}</a><p>{arrow_number}</p></li>
                            <li id={"cell_header_created_date"}><a href="#" onClick={(e) => this.handleClick(e,"date")}>{"Datum"}</a><p>{arrow_date}</p></li>

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

                            <li id={"cell_header_count_date_control"}><p>Ankomst</p></li>
                            <li id={"cell_header_count_date_control"}><p>Lastning påbörjad</p></li>
                            <li id={"cell_header_count_date_control"}><p>Lastning avslutad</p></li>
                            <li id={"cell_header_count_date_control"}><p>Avgång</p></li>  
                            <li id={"cell_header_count_date_control_add"}><p>{"+"}</p></li>                            

                    </div>
                </ul>
            </div>

        );
    }

  
}



export default CountingListHeader;
