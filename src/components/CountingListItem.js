import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './component.css';
import './StatusDropDown.css';
import { GetCurrentDateString } from '../Common';

import Common from '../Common';

class CountingListItem extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            enable_drop_down: false,           
            counts: this.props.counting.counts       
        }
    }

    handleChange = (index,department,pallet_type,event) => {

        var raw = event.target.value.toString();       

        var counts = this.state.counts;
        counts[index] = raw;
        this.setState({counts:counts});


        var count = parseFloat(event.target.value);
        count = Math.round(count / 0.5) * 0.5;

        if(!isNaN(count))
        {  
            if(typeof count == 'number')
            {                           
                this.UpdateCount(index,this.props.counting.counting_control_id,department,pallet_type, parseFloat(count));
            }
        }













/*
        var n = parseInt(event.target.value);

        if(!isNaN(n))
        {
           this.props.UpdateCount(index,this.props.counting.counting_control_id,department,pallet_type,n);
        }
        else
        {
            this.props.UpdateCount(index,this.props.counting.counting_control_id,department,pallet_type,0);
        }*/
    }

    UpdateCount = (index,counting_control_id, department, pallet_type, value) => {
 
        const request_options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
              {
                  counting_control_id: counting_control_id,
                  department: department,
                  pallet_type: pallet_type,
                  value: value,
              })
          };
          console.log(request_options);
    
          fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/UpdateCountingValue', request_options).then(response => {
                  
              if(response.status === 200)
              {
                console.log(value);
                
                var counts = this.state.counts;
                counts[index] = value;
                this.setState({counts:counts});
              }
          });
            
      }
    handleChangeDate = (index,department,pallet_type,event) => {

        
    }
    ChangeStatus = (event,status_id,status_name) => {


        this.setState({enable_drop_down: !this.state.enable_drop_down});        
        this.props.ChangeStatus(this.props.counting.counting_control_id,status_id,status_name);
        
    }
    EnableDropDown = (event) => {

        this.setState({enable_drop_down: !this.state.enable_drop_down});
        
    }
    UpdateTimeRapport = (id,type,index) => {

        switch(type)
        {
            case 0:
                this.UpdateTimeRapportArrival(id,index);
                break;
            case 1:
                this.UpdateTimeRapportLoadingStart(id,index);
                break;
            case 2:
                this.UpdateTimeRapportLoadingEnd(id,index);
                break;
            case 3:
                this.UpdateTimeRapportDeparture(id,index);
                break;
        }

    }

    UpdateTimeRapportArrival = (time_rapport_id,index) => {

        console.log("index:" + index);
        console.log("hehe" + this.props.counting.time_rapport[1].date_arrival);
        var date = Common.GetCurrentDateString();
        var time = Common.GetCurrentTimeString();

        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    time_rapport_id: time_rapport_id,
                    date_arrival: date,
                    time_arrival:time,
                })
            };      
            
            fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/UpdateTimeRapportArrival', request_options).then(response => {
                    
                if(response.status === 200)
                {
                    var counting = this.props.counting;
                    counting.time_rapport[index].date_arrival = date;
                    counting.time_rapport[index].time_arrival = time;
                    this.setState({counting:counting});
                }
            });

            
            console.log(date + " " + time);
    }
    UpdateTimeRapportLoadingStart = (time_rapport_id,index) => {

        var date = Common.GetCurrentDateString();
        var time = Common.GetCurrentTimeString();

        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    time_rapport_id: time_rapport_id,
                    date_loading_start: date,
                    time_loading_start: time,
                })
            };      
            fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/UpdateTimeRapportLoadingStart', request_options).then(response => {
                    
                if(response.status === 200)
                {
                    var counting = this.props.counting;
                    counting.time_rapport[index].date_loading_start = date;
                    counting.time_rapport[index].time_loading_start = time;
                    this.setState({counting:counting});
                }
            });
    }
    UpdateTimeRapportLoadingEnd = (time_rapport_id,index) => {

        var date = Common.GetCurrentDateString();
        var time = Common.GetCurrentTimeString();

        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    time_rapport_id: time_rapport_id,
                    date_loading_end: date,
                    time_loading_end: time,
                })
            };      
            fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/UpdateTimeRapportLoadingEnd', request_options).then(response => {
                    
                if(response.status === 200)
                {
                    var counting = this.props.counting;
                    counting.time_rapport[index].date_loading_end = date;
                    counting.time_rapport[index].time_loading_end = time;
                    this.setState({counting:counting});
                }
            });
    }
    UpdateTimeRapportDeparture = (time_rapport_id,index) => {

        var date = Common.GetCurrentDateString();
        var time = Common.GetCurrentTimeString();
        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    time_rapport_id: time_rapport_id,
                    date_departure: date,
                    time_departure: time,
                })
            };      
            fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/UpdateTimeRapportDeparture', request_options).then(response => {
                    
                if(response.status === 200)
                {
                    var counting = this.props.counting;
                    counting.time_rapport[index].date_departure = date;
                    counting.time_rapport[index].time_departure = time;
                    this.setState({counting:counting});
                }
            });
    }
    TranslateStatus = (status_name) => {

        switch(status_name.toString().toLowerCase())
        {
            case "planned":
                return "Planerad";
            case "started":
                return "Påbörjad";
            case "submitted":
                return "Skickad";
            case "approved":
                return "Godkänd";
            case "completed":
                return "Klar";
                default:
                    return "Error";
        }
        
    }
    AddTimeRapport = (counting_control_id) => {

        var date = Common.GetCurrentDateString();
        var time = Common.GetCurrentTimeString();

        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    counting_control_id: counting_control_id,
                    date_expected_arrival:date,
                    time_expected_arrival:time,
                
                    date_expected_loading:date,
                    time_expected_loading:time,
                
                    date_expected_departure:date,
                    time_expected_departure:time,
                })
            };      

            


            fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/CreateTimeRapport', request_options).then(res => res.json().then(json => {

                    this.props.AddTimeRapport(counting_control_id,json.insertId,date,time);
                    
            }));
        
    }
    RemoveTimeRapport = (counting_control_id,time_rapport_id) => {

        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    time_rapport_id: time_rapport_id,
                })
            };      
            fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/DeleteTimeRapport', request_options).then(response => {
                    
                if(response.status === 200)
                {
                   this.props.RemoveTimeRapport(counting_control_id,time_rapport_id);
                }
            });
        
    }
    render() {

        const {counting_control_id,status_name,status_id, customer_name,customer_number,created_date} = this.props.counting;

        const {time_rapport_id,date_expected_loading,time_expected_loading,date_arrival,time_arrival,date_loading_start,time_loading_start,date_loading_end,time_loading_end,date_departure,time_departure} = this.props.counting.time_rapport[0];

        var datetime_arrival = date_arrival + " " + time_arrival;
        var datetime_loading_start = date_loading_start + " " + time_loading_start;
        var datetime_loading_end = date_loading_end + " " + time_loading_end;
        var datetime_departure = date_departure + " " + time_departure;

        var customer_name_adjusted = customer_name;
        if(customer_name.length >= 16)
        {
            customer_name_adjusted = (customer_name.toString().substring(0,13) + "...");
        }
        var lol = "status-dropdown-content-inactive";

        if(this.state.enable_drop_down)
        {
            lol = "status-dropdown-content";
        }

        if(this.state.counts === undefined || this.state.counts === null || this.props.statuses === undefined || this.props.statuses === null)
        {
            return (<div></div>);
        }
        else
        {

            var customer_info_id = "customer_info_uncounted";

            var loading_date = new Date(date_expected_loading + " " + time_expected_loading)
            var currentdate = new Date(); 

            

            if(status_id < 3)
            {
                if(currentdate > loading_date)
                {
                    customer_info_id = "customer_info_uncounted_late";
                }
                else
                {
                    customer_info_id = "customer_info_uncounted";
                }
            }
            else if(status_id == 3)
            {
                customer_info_id = "customer_info_counted";
            }
            else if(status_id >= 4)
            {
                customer_info_id = "customer_info_done";
            }

            console.log("Status: " + status_id);

            var validated_created_date = created_date;

            try
            {
                validated_created_date = loading_date.toISOString().substring(0,16).replace("T"," ");
            }
            catch
            {
                validated_created_date = "1900-01-01";
            }
            

            var items = [];

            for(var i = 1; i < this.props.counting.time_rapport.length;i++)
            {
                var datetime_arrival2 = this.props.counting.time_rapport[i].date_arrival + " " + this.props.counting.time_rapport[i].time_arrival;
                var datetime_loading_start2 = this.props.counting.time_rapport[i].date_loading_start + " " + this.props.counting.time_rapport[i].time_loading_start;
                var datetime_loading_end2 = this.props.counting.time_rapport[i].date_loading_end + " " + this.props.counting.time_rapport[i].time_loading_end;
                var datetime_departure2 = this.props.counting.time_rapport[i].date_departure + " " + this.props.counting.time_rapport[i].time_departure;
                
                var time_rapport_id2 = this.props.counting.time_rapport[i].time_rapport_id;
                
                items.push({index:i,id:time_rapport_id2,type:0,datetime:datetime_arrival2});
                items.push({index:i,id:time_rapport_id2,type:1,datetime:datetime_loading_start2});
                items.push({index:i,id:time_rapport_id2,type:2,datetime:datetime_loading_end2});
                items.push({index:i,id:time_rapport_id2,type:3,datetime:datetime_departure2});
    
            }

            
            return (
                <div id={"cell"}>    
                    
                    
                    <li id={"cell_status"}>
                    <div className={"status-dropdown"}>
                            <button onClick={(e) => this.EnableDropDown(e)} className={"status-dropbtn"}>{this.TranslateStatus(status_name)}</button>
                            <div className={lol}>
                                <button onClick={(e) => this.ChangeStatus(e,this.props.statuses[0].id,this.props.statuses[0].name)}>{this.TranslateStatus(this.props.statuses[0].name)}</button>
                                <button onClick={(e) => this.ChangeStatus(e,this.props.statuses[1].id,this.props.statuses[1].name)}>{this.TranslateStatus(this.props.statuses[1].name)}</button>
                                <button onClick={(e) => this.ChangeStatus(e,this.props.statuses[2].id,this.props.statuses[2].name)}>{this.TranslateStatus(this.props.statuses[2].name)}</button>
                                <button onClick={(e) => this.ChangeStatus(e,this.props.statuses[3].id,this.props.statuses[3].name)}>{this.TranslateStatus(this.props.statuses[3].name)}</button>
                                <button onClick={(e) => this.ChangeStatus(e,this.props.statuses[4].id,this.props.statuses[4].name)}>{this.TranslateStatus(this.props.statuses[4].name)}</button>
                            </div>
                        </div>
                    </li>
                    <div id={customer_info_id}>  
                    <li id={"cell_customer_name"}><p>{customer_name_adjusted}</p></li>
                    <li id={"cell_customer_number"}>{customer_number}</li>
                    <li id={"cell_created_date"}>{validated_created_date}</li>
                    </div>  
                    <li id={"cell_count_dry"}><input type="number" onChange={(e) => this.handleChange(0,1,1, e)} value={this.state.counts[0]}/></li>
                    <li id={"cell_count_dry"}><input type="tel" onChange={(e) => this.handleChange(1,1,2, e)} value={this.state.counts[1]}/></li>
                    <li id={"cell_count_dry"}><input type="tel" onChange={(e) => this.handleChange(2,1,3, e)} value={this.state.counts[2]}/></li>
                    <li id={"cell_count_dry"}><input type="tel" onChange={(e) => this.handleChange(3,1,4, e)} value={this.state.counts[3]}/></li>


                    <li id={"cell_count_cold"}><input type="number" onChange={(e) => this.handleChange(4,2,1, e)} value={this.state.counts[4]}/></li>
                    <li id={"cell_count_cold"}><input type="tel" onChange={(e) => this.handleChange(5,2,2, e)} value={this.state.counts[5]}/></li>
                    <li id={"cell_count_cold"}><input type="tel" onChange={(e) => this.handleChange(6,2,3, e)} value={this.state.counts[6]}/></li>
                    <li id={"cell_count_cold"}><input type="tel" onChange={(e) => this.handleChange(7,2,4, e)} value={this.state.counts[7]}/></li>

                    <li id={"cell_count_frozen"}><input type="number" onChange={(e) => this.handleChange(8,3,1, e)} value={this.state.counts[8]}/></li>
                    <li id={"cell_count_frozen"}><input type="tel" onChange={(e) => this.handleChange(9,3,2, e)} value={this.state.counts[9]}/></li>
                    <li id={"cell_count_frozen"}><input type="tel" onChange={(e) => this.handleChange(10,3,3, e)} value={this.state.counts[10]}/></li>
                    <li id={"cell_count_frozen"}><input type="tel" onChange={(e) => this.handleChange(11,3,4, e)} value={this.state.counts[11]}/></li>


                    <li id={"cell_count_global"}><input type="tel" onChange={(e) => this.handleChange(12,5,6, e)} value={this.state.counts[12]}/></li>
                    <li id={"cell_count_global"}><input type="tel" onChange={(e) => this.handleChange(13,5,5, e)} value={this.state.counts[13]}/></li>
                    <li id={"cell_count_global"}><input type="tel" onChange={(e) => this.handleChange(14,5,7, e)} value={this.state.counts[14]}/></li>
                    <li id={"cell_count_global"}><input type="tel" onChange={(e) => this.handleChange(15,5,8, e)} value={this.state.counts[15]}/></li>


                    <li id={"cell_date_control"}><button onClick={(e) => this.UpdateTimeRapport(time_rapport_id,0,0)} className={"date-btn"}>{datetime_arrival == " " ? "Registrera" : datetime_arrival}</button></li>
                    <li id={"cell_date_control"}><button onClick={(e) => this.UpdateTimeRapport(time_rapport_id,1,0)} className={"date-btn"}>{datetime_loading_start == " " ? "Registrera" : datetime_loading_start}</button></li>
                    <li id={"cell_date_control"}><button onClick={(e) => this.UpdateTimeRapport(time_rapport_id,2,0)} className={"date-btn"}>{datetime_loading_end == " " ? "Registrera" : datetime_loading_end}</button></li>
                    <li id={"cell_date_control"}><button onClick={(e) => this.UpdateTimeRapport(time_rapport_id,3,0)} className={"date-btn"}>{datetime_departure == " " ? "Registrera" : datetime_departure}</button></li>
                    <li id={"cell_date_control_add"}><button onClick={(e) => this.AddTimeRapport(counting_control_id)} className={"add-date"}>{"+"}</button></li>



                    

                    {
                    
                    items.map((item) => {

                        if(item.type == 0)
                        {
                            return <div>
                                <li id={"cell_header_store_fill"}>&nbsp;</li>
                                <li id={"cell_header_dry_fill"}>&nbsp;</li>
                                <li id={"cell_header_cold_fill"}>&nbsp;</li>
                                <li id={"cell_header_frozen_fill"}>&nbsp;</li>
                                <li id={"cell_header_global_fill"}>&nbsp;</li>
                                <li id={"cell_date_control"}><button onClick={(e) => this.UpdateTimeRapport(item.id,item.type,item.index)} className={"date-btn"}>{item.datetime == " " ? "Registrera" : item.datetime}</button></li>
                                 </div>
                            
                        }
                        if(item.type == 3)
                        {
                            return <div>
                            <li id={"cell_date_control"}><button onClick={(e) => this.UpdateTimeRapport(item.id,item.type,item.index)} className={"date-btn"}>{item.datetime == " " ? "Registrera" : item.datetime}</button></li>
                            <li id={"cell_date_control_add"}><button onClick={(e) => this.RemoveTimeRapport(counting_control_id,item.id)} className={"add-date"}>{"-"}</button></li>
                            </div>
                        }
                        else
                        {
                            return <li id={"cell_date_control"}><button onClick={(e) => this.UpdateTimeRapport(item.id,item.type,item.index)} className={"date-btn"}>{item.datetime == " " ? "Registrera" : item.datetime}</button></li>
                                
                        }
                    })
                    
                    }

                    

                    {/*

                    <li id={"cell_date"}><button>Click me</button></li>
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

  
}

CountingListItem.propTypes = {

    counting: PropTypes.object.isRequired,
    statuses: PropTypes.array.isRequired
}


export default CountingListItem;
