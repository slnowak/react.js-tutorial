var React = require('react');
var TeamStore = require('../stores/team_store.js');
var FilterableTeamTable = require('./filterable_team_table.js');
var AddForm = require('./add_form.js');

var MainComponent = React.createClass({

  mixins: [TeamStore.mixin],

  getTeams: function() {
    return TeamStore.getTeams();
  },

  getInitialState: function() {
    return {
        teams: this.getTeams()
    };
  },

  storeDidChange: function() {
    this.setState({
      teams: this.getTeams()
    });
  },

  render: function() {
    return (
      <div className="col-lg-4 col-lg-offset-4">
        <FilterableTeamTable teams={this.state.teams}/>
        <AddForm/>
      </div>
    );
  }

});

module.exports = MainComponent;
