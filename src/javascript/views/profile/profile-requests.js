'use strict';

var React = require('react');
var Col = require('react-bootstrap/lib/Col.js');


/* eslint-disable max-len*/
var dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];
/* eslint-enable max-len*/
var ProfileRequests = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
    };
  },

  render: function render() {
    /* eslint-disable max-len*/
    return (
       <div>
        <Col xs={9} sm={9} md={9} lg={9}><code>&lt;{'Requests'} /&gt;</code><br/>{dummySentences.slice(0, 4).join(' ')}
        </Col>
        <Col xs={9} sm={9} md={9} lg={9}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 6).join(' ')}
        </Col>
        <Col xs={9} sm={9} md={9} lg={9}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 2).join(' ')}
        </Col>
      </div>
    );
  /* eslint-enable max-len*/
  }
});

module.exports = ProfileRequests;