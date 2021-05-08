import React, { Component } from 'react';
import Common from '../Common';
import CountingList from './CountingList';
import CountingListHeader from './CountingListHeader';
import ControlBar from './ControlBar';
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
      current_category:"number"
    }
}
Sort = (category) => {

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
      default:
        countings.sort(function(a,b){return (a.customer_name.toLowerCase() < b.customer_name.toLowerCase()) ? n[0]:n[1];});
          break;
  }
  
  this.setState({countings: countings});
}
componentDidMount(){

    var url_date_string = Common.GetCurrentURLDateString();

    this.FetchSource(url_date_string,url_date_string);

    fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/GetStatuses').then(res => res.json()).then(json => {this.setState({ statuses: json})});

}
FetchSource = (date_start,date_end) => {

  var url_date_start_string = (date_start.toString().split("-").join(""));
  var url_date_end_string = (date_end.toString().split("-").join(""));

  fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/GetCompleteCountingByDate/' + url_date_start_string + "/" + url_date_end_string)
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
ChangeStatus = (counting_control_id) => {
 
    var mark_everything_done = false;
    var index = -1;
    for(var i = 0;i < this.state.countings_source.length;i++)
    {
        if(this.state.countings_source[i].counting_control_id === counting_control_id)
        {
            var status_id = this.state.countings_source[i].status_id;
              
            if(status_id < 6)
            {
                status_id ++;
                mark_everything_done = (status_id === 4);
            }  

            index = i;
            break;
          }
      } 
      
      if(index !== -1)
      {
        var countings_source = this.state.countings_source.slice();
        countings_source[index].status_id = status_id;
        
        for(var j = 0; j < this.state.statuses.length;j++)
        {
          console.log(this.state.statuses[j].id  + "===" + status_id);
            if(this.state.statuses[j].id === status_id)
            {
              countings_source[index].status_name = this.state.statuses[j].name;
            }
        }

        if(mark_everything_done)
        {
          countings_source[index].done_dry = countings_source[index].done_cold = countings_source[index].done_frozen = countings_source[index].done_global = true;
        }
        
        this.setState({ countings_source: countings_source},)
        this.Filter(this.state.search_term);
        this.Sort(this.state.current_category);


        const request_options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
              {
                  done_dry: countings_source[index].done_dry,
                  done_cold: countings_source[index].done_cold,
                  done_frozen: countings_source[index].done_frozen,
                  done_global: countings_source[index].done_global,
                  status_id: countings_source[index].status_id,
                  id:countings_source[index].counting_control_id
              })
        };

        fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/UpdateCountingControlById/'+countings_source[index].counting_control_id, request_options).then();






      }
      
      

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
render() {
  
 
  return (
    <div>     
      <div id="banner">
        <h1>LUA Administrator</h1>
      </div>
      <ControlBar Filter={this.Filter} FetchSource={this.FetchSource} ></ControlBar>

      <CountingListHeader Sort={this.Sort}/>
      <CountingList countings={this.state.countings} UpdateCount={this.UpdateCount} ChangeStatus={this.ChangeStatus}/>
    </div>
  );
}

  
}

export default CountingsOverviewPage;
