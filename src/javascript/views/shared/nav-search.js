'use strict';

var React = require('react');
var AutoSuggest = require('react-autosuggest');

var navSearch = require('../../shared/nav-search.js');

function getSmallestPic(images) {
  return images.reduce(function(prev, curr) {
    if (prev.height < curr.height) {
      return prev;
    }
    return curr;
  }, []);
}

var NavSearch = React.createClass({
  getInitialState: function getInitialState() {
    return {
      value: "",
      suggestions: []
    };
  },

  renderSuggestion: function renderSuggestion(suggestion) {
    if (suggestion.type == "artist") {
      var image = getSmallestPic(suggestion.images);
      return (
        <a href={
          "/" + suggestion.type + "/" + suggestion.name.replace(/ /g, "_")
        }>
          <div>
            <img src = {image.url} />
            {suggestion.name}
          </div>
        </a>
        );
    }
    return (
      <a href={
        "/" + suggestion.type + "/" + suggestion.name.replace(/ /g, "_")
      }>
        <div>
          {suggestion.name}
        </div>
      </a>
    );
  },

  getSuggestionValue: function getSuggestionValue(suggestion) {
    return suggestion.name;
  },

  onChange: function onChange(event, changeObj) {
    if (changeObj.method === "up" || changeObj.method ==="down") {
      // don't change value when scrolling through suggestions
      return;
    }
    this.setState({
      value: changeObj.newValue
    });
  },

  onSuggestionsFetchRequested: function onSuggestionsFetchRequested(value) {
    navSearch.navSearch(value.value, function(err, response) {
      this.setState({
        suggestions: response.slice(0,5)
      });
    }.bind(this));
  },

  onSuggestionsClearRequested: function onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  },

  render: function render() {
    var inputProps = {
      placeholder: 'Search for artists and songs',
      value: this.state.value,
      onChange: this.onChange
    };
    return (
      <AutoSuggest
        suggestions={this.state.suggestions}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        inputProps={inputProps} renderSuggestion={this.renderSuggestion}
        getSuggestionValue={this.getSuggestionValue}>
       </AutoSuggest>
    );
  }
});

module.exports = NavSearch;