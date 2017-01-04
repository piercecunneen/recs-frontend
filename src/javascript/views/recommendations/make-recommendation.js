'use strict';

var React = require('react');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Form = require('react-bootstrap/lib/Form.js');
var FormGroup = require('react-bootstrap/lib/FormGroup.js');
var FormControl = require('react-bootstrap/lib/FormControl.js');
var ControlLabel = require('react-bootstrap/lib/ControlLabel.js');
var Button = require('react-bootstrap/lib/Button.js');





var Navbar = require('../shared/navbar.js');
var FriendSearch = require('../shared/friend-search.js');


var FaceBook = require('../../FB');
var login = require('../../login');

var makeRecommendation = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works',
      friends: undefined
    };
  },


  componentDidMount: function componentDidMount() {
    FaceBook.getUserFriends(
      login.getAuthToken(),
      function (err, friends) {
        this.setState({
          friends: friends
        });
      }.bind(this)
    );
  },

  handleClick: function handleClick() {
  },

  render: function render() {
    var friends;
    this.state.friends === undefined ?
      friends = [] :
      friends = this.state.friends.data;
    /* eslint-disable max-len*/

    var query = this.props.location.query;
    var itemType = query.itemType;
    var itemName = query.itemName;


    return (
       <div>
        <Navbar isLoggedIn={login.getLoggedInID()}> </Navbar>
        <Grid>
          <Row xsOffset={3} xs={6}>
             <Form>
              <FormGroup disabled controlId="formValidationSuccess1" validationState="success">
                <ControlLabel>Item Name</ControlLabel>
                <FormControl type="text" value={itemName} disabled={itemName !==undefined} />
              </FormGroup>

              <FormGroup controlId="itemType" validationState="warning">
                <ControlLabel>Item Type</ControlLabel>
                <FormControl type="text" value={itemType} disabled={itemType !== undefined} />
              </FormGroup>

              <FormGroup controlId="formValidationError1">
                <ControlLabel> Search for a friend to recommend this {itemType || "item"} to </ControlLabel>
                <FriendSearch friends = {friends}> </FriendSearch>
              </FormGroup>
              <Button onClick={this.handleClick} bsStyle="success"> Recommend! </Button>
            </Form>
          </Row>
        </Grid>
      </div>
    );
  /* eslint-enable max-len*/
  }
});

module.exports = makeRecommendation;
