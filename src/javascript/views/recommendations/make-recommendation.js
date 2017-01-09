'use strict';

var React = require('react');
var Button = require('react-bootstrap/lib/Button.js');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar.js');
var Modal  = require('react-bootstrap/lib/Modal.js');
var Glyphicon = require('react-bootstrap/lib/Glyphicon.js');

var FriendSearch = require('../shared/friend-search.js');

var login = require('../../login');
var api = require('../../api');

var makeRecommendation = React.createClass({

  getInitialState: function getInitialState() {
    return {
      showModal: false,
      friends: undefined,
      showErrorModal: false,
      showSuccessModal: false
    };
  },

  close: function close() {
    this.setState(
      {
        showModal: false
      }
    );
  },

  open: function open() {
    this.setState(
      {
        showModal: true
      }
    );
  },

  closeError: function closeError() {
    this.setState(
      {
        showErrorModal: false
      }
    );
  },

  openError: function openError() {
    this.setState(
      {
        showErrorModal: true
      }
    );
  },
  closeSuccess: function closeSuccess() {
    this.setState(
      {
        showSuccessModal: false,
        showErrorModal: false,
        showModal: false
      }
    );
  },

  openSuccess: function openSuccess() {
    this.setState(
      {
        showSuccessModal: true,
        showModal: false
      }
    );
  },

  handleRecommendAction: function handleRecommendAction() {
    var friendSelectedID = this.refs.friendSearch.state.friendSelected &&
      this.refs.friendSearch.state.friendSelected.id;
    if (friendSelectedID) {
      var requestBody = {
        'from_user_id': Number(login.getLoggedInID()),
        'to_user_id':   Number(friendSelectedID),
        'item_id':      this.props.item_id,
        'item_data':    this.props.item_data
      };
      api.add_recommendation(requestBody, function(err) {
        if (!err) {
          this.openSuccess();
        }
      }.bind(this));
    } else {
      this.openError();
    }
  },
  handleInvite: function handleInvite() {
    FB.ui({
      method: 'send',
      link: 'www.ndreviews.com'
    });
  },
  render: function render() {

    var friends;
    this.props.user_friends === undefined ?
      friends = [] :
      friends = this.props.user_friends.data;
    /* eslint-disable max-len */
    var inviteString = "Can't find your friend? Invite them to Helix via Facebook!";
    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={this.open}
          bsStyle="success"
          style={{display:"block", margin:"auto"}}
        >
          Recommend to a friend! <Glyphicon glyph="send" />
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            {this.props.item.type === "track" ?
              <Modal.Title>Recommending {this.props.item.title} by {this.props.item.artists[0].name} to ...</Modal.Title> :
              <Modal.Title>Recommending {this.props.item.name} </Modal.Title>
            }
          </Modal.Header>
          <Modal.Body>
            <FriendSearch ref = "friendSearch" friends = {friends}> </FriendSearch>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.handleInvite}> {inviteString} </Button>
            </ButtonToolbar>
          </Modal.Footer>
            <Modal show={this.state.showErrorModal} onHide={this.closeError}>
              <Modal.Header closeButton>
                <Modal.Title>Error, please enter a valid friend name</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <ButtonToolbar>
                  <Button onClick={this.closeError}>Close</Button>
                </ButtonToolbar>
              </Modal.Footer>
            </Modal>
          <Modal.Footer>
            <ButtonToolbar>
              <Button onClick={this.handleRecommendAction}> Recommend! </Button>
              <Button onClick={this.close}>Close</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showSuccessModal} onHide={this.closeSuccess}>
          <Modal.Header closeButton>
            <Modal.Title>Recommendation Sent!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <ButtonToolbar>
              <Button onClick={this.closeSuccess}>Close</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </div>
    );
    /* eslint-enable max-len */
  }
});

module.exports = makeRecommendation;