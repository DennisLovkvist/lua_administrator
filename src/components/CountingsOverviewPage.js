import React, { Component } from 'react';
import Common from '../Common';
import CountingList from './CountingList';
import CountingListHeader from './CountingListHeader';
import ControlBar from './ControlBar';
import NewCustomerForm from './NewCustomerForm';
import './component.css';



class CountingsOverviewPage extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        countings_source: [],
        countings: [],
        statuses:[],
        search_term:"",
        sort_desc:true,
        current_category:"name",
        mode:"overview",
        loaded:false
      }
  }
Sort = (category) => {

  return;
  this.setState({current_category:category});
  var countings = this.state.countings.slice();

  var n = (this.state.sort_desc) ? [-1,1]:[1,-1];

  switch(category)
  {
      case "number":
        countings.sort(function(a,b){return (a.customer_number < b.customer_number) ? n[0]:n[1];});
          break;
      case "status":
        countings.sort(function(a,b){return (a.status_id < b.status_id) ? n[0]:n[1];});
          break;
      case "date":
        countings.sort(function(a,b){return (a.created_date < b.created_date) ? n[0]:n[1];});
          break;
      case "name":
        countings.sort(function(a,b){return (a.customer_name.toLowerCase() < b.customer_name.toLowerCase()) ? n[0]:n[1];});
          break;
      default:
        countings.sort(function(a,b){return (a.customer_name.toLowerCase() < b.customer_name.toLowerCase()) ? n[0]:n[1];});
          break;
  }
  
  this.setState({countings: countings});
}
componentDidMount(){

    var url_date_string = Common.GetCurrentURLDateString();

    this.FetchSource(url_date_string,url_date_string);

    fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/GetStatuses').then(res => res.json()).then(json => {this.setState({ statuses: json,loaded:true})});

}
FetchSource = (date_start,date_end) => {

  var url_date_start_string = (date_start.toString().split("-").join(""));
  var url_date_end_string = (date_end.toString().split("-").join(""));

    
        fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/GetCompleteCountingByDate2/' + url_date_start_string + "/" + url_date_end_string)        
        
        .then(res => res.json())
          .then(json => {
            
            console.log(json);
            var countings_source = [];

            for(var i = 0; i < json.length;i++)
            {
                var object = {

                    counting_control_id:json[i].counting_control_id,
                    status_id:json[i].status_id,
                    created_date:json[i].created_date,
                    customer_id:json[i].customer_id,
                    customer_name:json[i].customer_name,
                    customer_number:json[i].customer_number,
                    status_name:json[i].status_name,
                    done: [json[i].done_dry,json[i].done_cold,json[i].done_frozen,json[i].done_global],
                    counts:[
                        json[i].dry_pp,json[i].dry_sp,json[i].dry_hp,json[i].dry_sk,
                        json[i].cold_pp,json[i].cold_sp,json[i].cold_hp,json[i].cold_sk,
                        json[i].frozen_pp,json[i].frozen_sp,json[i].frozen_hp,json[i].frozen_sk,
                        json[i].wood,json[i].gray,json[i].blue,json[i].red
                    ],
                    date_arrival:json[i].date_arrival,
                    date_loading_start:json[i].date_loading_start,
                    date_loading_end:json[i].date_loading_end,
                    date_departure:json[i].date_departure,
                    time_arrival:json[i].time_arrival,
                    time_loading_start:json[i].time_loading_start,
                    time_loading_end:json[i].time_loading_end,
                    time_departure:json[i].time_departure,

                    date_expected_arrival:json[i].date_expected_arrival,
                    date_expected_loading:json[i].date_expected_loading,
                    date_expected_departure:json[i].date_expected_departure,
                    time_expected_arrival:json[i].time_expected_arrival,
                    time_expected_loading:json[i].time_expected_loading,
                    time_expected_departure:json[i].time_expected_departure,
                }

                countings_source.push(object);

              }
              this.setState(

                  { countings_source: countings_source,
                    countings: countings_source },
              )
          });
    
}
Filter = (search_term) => {
 

  if(search_term.length === 0)
  {
    this.setState({countings : this.state.countings_source}); 
  }
  else
  {
      var countings = [];

      for(var i = 0;i < this.state.countings_source.length;i++)
      {
          if(this.state.countings_source[i].customer_name.toLowerCase().match(search_term.toLowerCase()))
          {
            countings.push(this.state.countings_source[i]);
          }
      }

      this.setState({countings : countings});  
    }


      
}
ChangeStatus = (counting_control_id,status_id,status_name) => {
 
  var index = -1; 
 
  var countings = this.state.countings_source;

  for(var i = 0;i < countings.length;i++)
  {
        if(countings[i].counting_control_id === counting_control_id)
        {
            index = i;
            break;
        }
  }

  if(index === -1)
  {
      return;
  }

  var lol = (status_id === 2) ? false:true;

    const request_options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
          {
              counting_control_id: countings[index].counting_control_id,
              status_id: status_id,
              done_dry: lol,
              done_cold: lol,
              done_frozen: lol,
              done_global: lol
          })
    };
    fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/UpdateCountingControlById', request_options).then(response => {
                  
      if(response.status === 200)
      {
        countings[index].status_name = status_name;
        countings[index].status_id = status_id;

        this.setState({ countings_source: countings});
        this.setState({ countings: countings});
        this.Filter(this.state.search_term);
        this.Sort(this.state.current_category);
      }
  });


  

 
  

}
UpdateCount = (index,counting_control_id, department, pallet_type, value) => {
       
      for(var i = 0;i < this.state.countings_source.length;i++)
      {
          if(this.state.countings_source[i].counting_control_id === counting_control_id)
          {
            var countings_source = this.state.countings_source.slice();
            countings_source[i].counts[index] = value;            
            this.setState({ countings_source: countings_source},)
            this.Filter(this.state.search_term);
            this.Sort(this.state.current_category);

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
        
              fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/UpdateCountingValue', request_options).then();

            break;
          }
      }

      

      
}

Export()
{
    var output = [this.state.countings_source.length+1];
    output[0] = ["Kund","Kundnr","Datum","Status","PPLD","PD","HPD","SD","PPLK","PK","HPK","SK","PPLF","PF","HPF","SF","Trä","Grå","Chep","Röd"];
    var index = 1;
    for(var i = 0;i < this.state.countings_source.length;i++)
    {
        var src = this.state.countings_source[i];        

        output[index] = [ src.customer_name,src.customer_number,src.created_date,src.status_name,
                          src.counts[0],src.counts[1],src.counts[2],src.counts[3],
                          src.counts[4],src.counts[5],src.counts[6],src.counts[7],
                          src.counts[8],src.counts[9], src.counts[10],src.counts[11],
                          src.counts[12],src.counts[13],src.counts[14],src.counts[15]];   

        index ++;         
        
    }
    

    return output;
}
ExitNewCustomerForm = () => {

  this.setState({mode : "overview"}); 
}
EnterNewCustomerForm = () => {

  this.setState({mode : "new_customer"}); 
}

render() {
 
    const csvData = this.Export();
  
    if(this.state.loaded)
    {

        if(this.state.mode == "overview")
        {
          return (
              <div>           

              <div id="banner">
                <h1>LUA Administrator</h1>
              </div>

              <ControlBar csvData={csvData} EnterNewCustomerForm={this.EnterNewCustomerForm} Filter={this.Filter} FetchSource={this.FetchSource} ></ControlBar>

              <CountingListHeader Sort={this.Sort}/>

              


              <CountingList statuses={this.state.statuses} countings={this.state.countings} UpdateCount={this.UpdateCount} ChangeStatus={this.ChangeStatus}/>
            </div>
          );
        }
        if(this.state.mode == "new_customer")
        {
            return (
              <div>  
                <NewCustomerForm ExitNewCustomerForm={this.ExitNewCustomerForm}/>
              </div>
          );
        }
      }
      else
      {
        return (<div></div>)
      }
    
  }

  
}

export default CountingsOverviewPage;
