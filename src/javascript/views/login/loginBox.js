'use strict';

var React = require('react');
var Jumbotron = require('react-bootstrap/lib/Jumbotron.js');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');
var Button = require('react-bootstrap/lib/Button.js');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar.js');


var buttonToolbarStyle = {
  "padding-bottom": "5px"
};
var LoginBox = React.createClass({
  getInitialState: function getInitialState() {
    return {

    };
  },

  render: function render() {
    return(
        <Grid>
          <Row className="show-grid">
            <Col sm={8} md={6} smOffset={2} mdOffset={3}>
              <Jumbotron>
                <ButtonToolbar style={buttonToolbarStyle}>
                  <Button bsStyle="primary" bsSize="large">
                    Login with facebook
                  </Button>
                </ButtonToolbar>
                <ButtonToolbar>
                  <Button bsStyle="danger" bsSize="large">
                    Login with Google
                  </Button>
                </ButtonToolbar>
              </Jumbotron>
            </Col>
          </Row>
        </Grid>
    );
  }
});

module.exports = LoginBox;
