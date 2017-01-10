'use strict';

var React = require('react');
var Tabs = require('react-bootstrap/lib/Tabs.js');
var Tab = require('react-bootstrap/lib/Tab.js');

var Track = require('../music/track-rec-item.js');
var Artist = require('../music/artist-rec-item.js');

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
            {
              this.props.recommendations.map(function(rec_item, index) {
                if (this.props.type !== 'all' && this.props.type !== rec_item.item_data.type ||
                  rec_item.from_user_id !== this.state.user_id
                  ) {
                  /* skips Recs that are of the wrong type or not in right "direction" (To vs From) */
                  return;
                }
                var item;
                if (rec_item.item_data.type === "track") {
                  item = (
                    <Track
                      index={index}
                      toUser={false}
                      rec_item={rec_item}
                      friend_id={rec_item.to_user_id}
                      user_friends = {this.props.friends.data || []}
                      num_favs={0}
                      fav_data={[]}
                      num_recs={0}
                      user_id={login.getLoggedInID()}
                      selected={false}>
                    </Track>
                  );
                } else if (rec_item.item_data.type === "artist") {
                  item = (
                    <Artist
                      rec_item={rec_item}
                      artist={rec_item.item_data}
                       toUser={false}
                      friend_id={rec_item.to_user_id}
                      user_friends = {this.props.friends.data || []}>
                    </Artist>
                  );
                }
                return item;
              }.bind(this))
            }
          </Tab>
          <Tab eventKey={2} title="To">
            {
              this.props.recommendations.map(function(rec_item) {
                var item;
                if (this.props.type !== 'all' && this.props.type !== rec_item.item_data.type ||
                  rec_item.to_user_id !== this.state.user_id
                  ) {
                  /* skips Recs that are of the wrong type or not in right "direction" (To vs From) */
                  return;
                }
                if (rec_item.item_data.type === "track") {
                  item = (
                      <Track
                        rec_item={rec_item}
                        toUser={true}
                        friend_id={rec_item.from_user_id}
                        user_friends = {this.props.friends.data || []}
                        num_favs={0}
                        fav_data={[]} num_recs={0}
                        user_id={login.getLoggedInID()}
                        selected={false}>
                      </Track>
                  );
                } else if (rec_item.item_data.type === "artist") {
                  item = (
                      <Artist
                        rec_item={rec_item}
                        artist={rec_item.item_data}
                         toUser={false}
                        friend_id={rec_item.to_user_id}
                        user_friends = {this.props.friends.data || []}>
                      </Artist>
                    );
                }
                return item;
              }.bind(this))
            }
          </Tab>
        </Tabs>
      </div>
    );
  /* eslint-enable max-len*/
  }
});

module.exports = ProfileRecs;