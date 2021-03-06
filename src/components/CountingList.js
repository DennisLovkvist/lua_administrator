import React, { Component } from 'react';
import CountingListItem from './CountingListItem';
import PropTypes from 'prop-types';

class CountingList extends Component {
    
  
    render() {

        return this.props.countings.map((counting) => (
            
                <ul id={"counting_view_list"} key={counting.counting_control_id} >
                    <div className={"counting_view"} >
                        <CountingListItem
                        counting={counting}
                        statuses={this.props.statuses}
                        UpdateCount={this.props.UpdateCount}
                        ChangeStatus={this.props.ChangeStatus}
                        AddTimeRapport={this.props.AddTimeRapport} 
                        RemoveTimeRapport={this.props.RemoveTimeRapport}
                        />
                    </div>
                </ul>
            

           ));
    }

  
}

CountingList.propTypes = {

    countings: PropTypes.array.isRequired,
    statuses: PropTypes.array.isRequired
}

export default CountingList;
