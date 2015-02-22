var React = require('react');
var Input = require('react-bootstrap').Input;
var TeamActions = require('../actions/team_actions.js');

var AddForm = React.createClass({
  handleFormSubmit: function(e) {
    e.preventDefault();

    var name = this._trimmedValue(this.refs.name);
    var rating = this._trimmedValue(this.refs.rating);

    if (name && rating) {
      TeamActions.addTeam(
        {name: name, rating: rating}
      );
      this._clearForm();
    }
  },

  _trimmedValue: function(field) {
    return field.getInputDOMNode().value.trim();
  },

  _setValue: function(field, value) {
    field.getInputDOMNode().value = value;
  },

  _clearForm: function() {
    this._setValue(this.refs.name, '');
    this._setValue(this.refs.rating, '');
  },

  getNameInputValue: function() {
    return this._trimmedValue(this.refs.name);
  },

  getRatingInputValue: function() {
    return this._trimmedValue(this.refs.rating);
  },

  setNameInputValue: function(name) {
    this._setValue(this.refs.name, name);
  },

  setRatingInputValue: function(rating) {
    this._setValue(this.refs.rating, rating);
  },

  render: function() {
    return (
        <form onSubmit={this.handleFormSubmit}>
          <Input label="Name" type="text" placeholder="Name" ref="name" />
          <Input label="Rating" type="text" placeholder="Rating" ref="rating" />
          <Input bsStyle="primary" type="submit" value="Add!" />
        </form>
    );
  }
})

module.exports = AddForm;
