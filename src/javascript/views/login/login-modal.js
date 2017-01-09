
'use strict';

var React = require('react');
var Button = require('react-bootstrap/lib/Button.js');
var Modal  = require('react-bootstrap/lib/Modal.js');
var Glyphicon = require('react-bootstrap/lib/Glyphicon.js');

var login = require('../../login');

var makeRecommendation = React.createClass({
  getInitialState: function getInitialState() {
    return {
      showModal: false,
      showSuccess: false,
      successMessage: ""
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

  openSuccess: function openSuccess(successMessage) {
    this.setState({
      'showSuccess': true,
      'showModal': false,
      'successMessage': successMessage
    });
  },

  closeSuccess: function closeSuccess() {
    window.location.reload();
    this.setState({
      'showSuccess': false
    });
  },

  handleLogin: function handleLogin() {
    login.handleFBLogin(function(err, body, message) {
      if (!err) {
        this.openSuccess(message);
      }
    }.bind(this));
  },
  render: function render() {

    return (
      <div>
        <a onClick={this.open}>
          Login <Glyphicon glyph="profile" />
        </a>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Login w/ Facebook</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button onClick={this.handleLogin}> Login </Button>
          </Modal.Body>
        </Modal>
        <Modal show={this.state.showSuccess} onHide={this.closeSuccess}>
          <Modal.Header closeButton>
            <Modal.Title> {this.state.successMessage} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button onClick={this.closeSuccess}> Close </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

module.exports = makeRecommendation;
