var React = require('react');
var Input = require('react-bootstrap').Input;

var SearchBar = React.createClass({
  handleFilterTextChanged: function() {
    this.props.onFilterTextChanged(
      this.refs.filterText.getInputDOMNode().value
    );
  },

  render: function() {
    return (
      <form className="form-inline">
        <Input onChange={this.handleFilterTextChanged} type="text" placeholder="Filter by name" ref="filterText" />
      </form>
    );
  }
});

module.exports = SearchBar;
