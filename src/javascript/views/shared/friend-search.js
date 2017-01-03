var React = require('react');
var AutoSuggest = require('react-autosuggest');

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(person) {
  return person.name;
}
var NavSearch = React.createClass({
  getInitialState: function getInitialState() {
    return {
      value: "",
      suggestions: [],
      friendSelected: undefined
    };
  },

  getSuggestions: function getSuggestions(value) {
    var escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }

    var regex =  RegExp('\\b' + escapedValue, 'i');

    return this.props.friends.filter(function(person) {
      return regex.test(getSuggestionValue(person));
    });
  },

  renderSuggestion: function renderSuggestion(suggestion) {
    return (
      <div style={{"color":"#00d0FF"}}>
        {suggestion.name}
      </div>
    );
  },

  getSuggestionValue: function getSuggestionValue(suggestion) {
    return suggestion.name;
  },

  onChange: function onChange(event, changeObj) {
    // changeObj = {newValue, method}
    if (changeObj.method === "up" || changeObj.method ==="down") {
      // don't change value when scrolling through suggestions
      return;
    }
    this.setState({
      value: changeObj.newValue,
      friendSelected: this.props.friends.filter(function(obj) {
        return changeObj.newValue == obj.name;
      })[0]
    });
  },

  onSuggestionsFetchRequested: function onSuggestionsFetchRequested(changeObj) {
    this.setState({
      suggestions: this.getSuggestions(changeObj.value)
    });
  },

  onSuggestionsClearRequested: function onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  },

  render: function render() {
    var inputProps = {
      placeholder: 'Friend Search',
      value: this.state.value,
      onChange: this.onChange
    };
    return (
      <AutoSuggest style={{"color":"#0000FF"}}
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