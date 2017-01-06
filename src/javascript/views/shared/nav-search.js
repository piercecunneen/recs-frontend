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
        <div style={{"color":"#0000FF"}}>
          {suggestion.name} ({suggestion.type})
          <img src = {image.url} />
        </div>
        );
    }
    return (
      <div style={{"color":"#0000FF"}}>
        {suggestion.name} ({suggestion.type}) by {suggestion.artists[0].name}
      </div>
    );
  },

  onSuggestionSelected: function onSuggestionSelected(event, suggestionObj) {
    // definition for suggestionObj : { suggestion, suggestionValue, sectionIndex, method }
    var suggestion = suggestionObj.suggestion;
    if (suggestion.type === "track") {
      window.location.href = "".concat(
        "/album/",
        suggestion.album.id,
        '?highlighted-track=',
        suggestion.id
      );
    } else {
      window.location.href = "/" + suggestion.type + "/" + suggestion.id;
    }
  },

  getSuggestionValue: function getSuggestionValue(suggestion) {
    return suggestion.name;
  },

  onChange: function onChange(event, changeObj) {
    // changeObj = {neVale, method}
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
      placeholder: 'Search for music!',
      value: this.state.value,
      onChange: this.onChange
    };
    return (
      <AutoSuggest
        suggestions={this.state.suggestions}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        inputProps={inputProps} renderSuggestion={this.renderSuggestion}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionSelected = {this.onSuggestionSelected}>
       </AutoSuggest>
    );
  }
});

module.exports = NavSearch;