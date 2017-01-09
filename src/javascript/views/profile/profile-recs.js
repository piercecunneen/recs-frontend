'use strict';

var React = require('react');
var Table = require('react-bootstrap/lib/Table.js');
var Tabs = require('react-bootstrap/lib/Tabs.js');
var Tab = require('react-bootstrap/lib/Tab.js');

var Track = require('../music/track-alternate.js');

var login = require('../../login');

var ProfileRecs = React.createClass({
  getInitialState: function getInitialState() {
    return {
      recommendations: [],
      friends: [],
      user_id: Number(login.getLoggedInID())
    };
  },

  render: function render() {
    /* eslint-disable max-len*/
    return (
       <div>
       <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="From">
          <Table>
            <thead>
              <tr>
                <th> Title </th>
                <th> Artist </th>
                <th> Album </th>
                <th> </th>
                <th> </th>
                <th> Rec rating</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.recommendations.map(function(rec_item) {
                  if (rec_item.from_user_id === this.state.user_id) {
                    return (
                        <Track
                          id={rec_item.item_id}
                          user_friends = {this.props.friends}
                          num_favs={0}
                          fav_data={[]} num_recs={0}
                          track={rec_item.item_data}
                          user_id={login.getLoggedInID()}
                          selected={false}
                          rating={rec_item.rating}>
                        </Track>
                    );
                  }
                }.bind(this))
              }
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey={2} title="To">
          <Table>
            <thead>
              <tr>
                <th> Title </th>
                <th> Artist </th>
                <th> Album </th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.recommendations.map(function(rec_item) {
                  if (rec_item.to_user_id === this.state.user_id) {
                    return (
                        <Track
                          id={rec_item.item_id}
                          user_friends = {this.props.friends}
                          num_favs={0}
                          fav_data={[]} num_recs={0}
                          track={rec_item.item_data}
                          user_id={login.getLoggedInID()}
                          selected={false}
                          rating={rec_item.rating}>
                        </Track>
                    );
                  }
                }.bind(this))
              }
            </tbody>
          </Table>
        </Tab>
      </Tabs>
      </div>
    );
  /* eslint-enable max-len*/
  }
});

module.exports = ProfileRecs;