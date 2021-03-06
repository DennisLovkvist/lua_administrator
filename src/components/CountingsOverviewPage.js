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
        route_filters: [true,true,true],
        sort_desc:false,
        sort_category:"date",
        mode:"overview",
        loaded:false,
        statuses_loaded:false,
        omit_completed_posts:true
      }
  }

componentDidMount(){

    var url_date_string = Common.GetCurrentURLDateString();

    this.FetchSource(url_date_string,url_date_string);

    fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/GetStatuses').then(res => res.json()).then(json => {this.setState({ statuses: json,statuses_loaded:true})});

}
AddTimeRapport = (counting_control_id,time_rapport_id,date,time) => {

  var countings_source = this.state.countings_source;
  var countings = this.state.countings; 
  
  var date_object = {

    date_arrival:"",
    date_loading_start:"",
    date_loading_end:"",
    date_departure:"",
    time_arrival:"",
    time_loading_start:"",
    time_loading_end:"",
    time_departure:"",

    date_expected_arrival:date,
    date_expected_loading:date,
    date_expected_departure:date,
    time_expected_arrival:time,
    time_expected_loading:time,
    time_expected_departure:time,
    time_rapport_id:time_rapport_id

  }

  for(var i = 0;i < countings_source.length; i++)
  {
      if(countings_source[i].counting_control_id == counting_control_id)
      {
        countings_source[i].time_rapport.push(date_object);
        break;
      }
  }
  this.setState({ countings_source: countings_source},);

}
RemoveTimeRapport = (counting_control_id,time_rapport_id) => {

  var countings_source = this.state.countings_source;
  var countings = this.state.countings; 
  
  var flag = false;

  for(var i = countings_source.length-1;i >= 0 && !flag; i--)
  {
      if(countings_source[i].counting_control_id == counting_control_id)
      {
          for(var j = countings_source[i].time_rapport.length-1;j > 0; j--)
          {
              if(countings_source[i].time_rapport[j].time_rapport_id == time_rapport_id)
              {
                countings_source[i].time_rapport.splice(j,1);
                flag = true;
                break;
              }
          }
      }
  }
  this.setState({ countings_source: countings_source},);


}
FetchSource = (date_start,date_end) => {

  var url_date_start_string = (date_start.toString().split("-").join(""));
  var url_date_end_string = (date_end.toString().split("-").join(""));

    
        fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/GetCompleteCountingByDate2/' + url_date_start_string + "/" + url_date_end_string)        
        
        .then(res => res.json())
          .then(json => {
            
            var countings_source = [];

            for(var i = 0; i < json.length;i++)
            {

                var date_object = {

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
                  time_rapport_id:json[i].time_rapport_id

                }

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
                    time_rapport:[date_object],
                    route:json[i].route,
                }
                var flag = false;
                for(var j = 0; j < countings_source.length;j++)
                {
                    if(countings_source[j].counting_control_id == object.counting_control_id)
                    {
                        flag = true;
                        countings_source[j].time_rapport.push(date_object);
                        break;
                    }
                }
                if(!flag)
                {
                  countings_source.push(object);
                }

              }

              this.setState(

                  { countings_source: countings_source,
                    countings: countings_source,
                    loaded: true
                   },
              );

              this.Filter(this.state.search_term,this.state.sort_category,this.state.sort_desc);
          });
    
}
ChangeOmitCompletedPosts = (value) => {

      this.setState({omit_completed_posts: value});
      this.Filter(this.state.search_term,this.state.sort_category,this.state.sort_desc);
}
ChangeRouteFilter = (index,value) => {
  
      var route_filters = this.state.route_filters;
      route_filters[index] = value;
      this.setState({route_filters: route_filters});
      console.log(route_filters);

      this.Filter(this.state.search_term,this.state.sort_category,this.state.sort_desc);
  
  }
Filter = (search_term,sort_category,sort_desc) => {

      var countings = [];

      for(var i = 0;i < this.state.countings_source.length;i++)
      {
          var match_search = false;
          var omit = false;

          if(this.state.omit_completed_posts)
          {
              if(this.state.countings_source[i].status_id == 5)
              {
                  omit = true;
              }
          }

          if(!omit)
          {
              if(this.state.countings_source[i].customer_name.toLowerCase().match(search_term.toLowerCase()))
              {
                  match_search = true;
              }
              else if(this.state.countings_source[i].customer_number.toLowerCase().match(search_term.toLowerCase()))
              {
                  match_search = true;
              }
          }

          if(match_search)
          {
              var flag = false;
              if(this.state.countings_source[i].route == "T")
              {
                  if(this.state.route_filters[0])
                  {
                      flag = true;
                  }
              }
              else if(this.state.countings_source[i].route == "A")
              {
                  if(this.state.route_filters[1])
                  {
                      flag = true;
                  }
              }
              else if(this.state.countings_source[i].route == "E")
              {
                  if(this.state.route_filters[2])
                  {
                      flag = true;
                  }
              }
              if(flag)
              {
                countings.push(this.state.countings_source[i]);
              }
          }
      }

      var n = (sort_desc) ? [-1,1]:[1,-1];
      
      switch(sort_category)
      {
          case "number":
            countings.sort(function(a,b){return (parseInt(a.customer_number) < parseInt(b.customer_number)) ? n[0]:n[1];});
              break;
          case "status":
            countings.sort(function(a,b){return (a.status_id < b.status_id) ? n[0]:n[1];});
              break;
          case "date":
            countings.sort(function(a,b){

              var date_a = new Date(a.time_rapport[0].date_expected_arrival + " " + a.time_rapport[0].time_expected_arrival).getTime();
              var date_b = new Date(b.time_rapport[0].date_expected_arrival + " " + b.time_rapport[0].time_expected_arrival).getTime();
              return date_a > date_b ? n[0]:n[1];        
            });
              break;
          case "name":
            countings.sort(function(a,b){return (a.customer_name.toLowerCase() < b.customer_name.toLowerCase()) ? n[0]:n[1];});
              break;
          default:
            countings.sort(function(a,b){return (a.customer_name.toLowerCase() < b.customer_name.toLowerCase()) ? n[0]:n[1];});
              break;
      }



      this.setState({countings : countings,
        search_term:search_term,
        sort_category:sort_category,
        sort_desc:sort_desc      
      });  
    


      
}
//Planned=1;Started=2;Submitted=3;Approved=4;Completed=5;
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
        this.Filter(this.state.search_term,this.state.sort_category,this.state.sort_desc);
        this.Sort(this.state.sort_category, this.state.sort_desc);
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
            this.Filter(this.state.search_term,this.state.sort_category,this.state.sort_desc);

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
    output[0] = ["Kund","Kundnr","Datum","Status","PPLD","PD","HPD","SD","PPLK","PK","HPK","SK","PPLF","PF","HPF","SF","Tr??","Gr??","Chep","R??d","Ankomst","Lastning p??b??rjad","Lastning avslutad","Avg??ng"];
    var index = 1;
    for(var i = 0;i < this.state.countings_source.length;i++)
    {
        var src = this.state.countings_source[i];        

        output[index] = [ src.customer_name,src.customer_number,src.created_date,src.status_name,
                          src.counts[0],src.counts[1],src.counts[2],src.counts[3],
                          src.counts[4],src.counts[5],src.counts[6],src.counts[7],
                          src.counts[8],src.counts[9], src.counts[10],src.counts[11],
                          src.counts[12],src.counts[13],src.counts[14],src.counts[15],
                          (src.date_arrival + " " + src.time_arrival),
                          (src.time_rapport[0].date_loading_start + " " + src.time_rapport[0].time_loading_start),
                          (src.time_rapport[0].date_loading_end + " " + src.time_rapport[0].time_loading_end),
                          (src.time_rapport[0].date_departure + " " + src.time_rapport[0].time_departure)];   

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
  
    if(this.state.loaded && this.state.statuses_loaded)
    {

        if(this.state.mode == "overview")
        {
          return (
              <div>           

              <div id="banner">
                <h1>LUA Administrator</h1>
              </div>

              <ControlBar search_term={this.state.search_term} sort_category={this.state.sort_category} sort_desc={this.state.sort_desc} ChangeOmitCompletedPosts={this.ChangeOmitCompletedPosts} csvData={csvData} EnterNewCustomerForm={this.EnterNewCustomerForm} Filter={this.Filter} FetchSource={this.FetchSource} ChangeRouteFilter={this.ChangeRouteFilter} ></ControlBar>

              <CountingListHeader search_term={this.state.search_term} sort_category={this.state.sort_category} sort_desc={this.state.sort_desc} ChangeSortType={this.ChangeSortType} Filter={this.Filter}/>

              <CountingList AddTimeRapport={this.AddTimeRapport} RemoveTimeRapport={this.RemoveTimeRapport} statuses={this.state.statuses} countings={this.state.countings} UpdateCount={this.UpdateCount} ChangeStatus={this.ChangeStatus}/>
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
