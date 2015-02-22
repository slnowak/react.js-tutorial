var React = require('react');
var SearchBar = require('./search_bar.js');
var TeamTable = require('./team_table.js');

var FilterableTeamTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: ""
    };
  },

  filterTextChanged: function(newFilterText) {
    this.setState({
      filterText: newFilterText
    });
  },

  render: function() {
    var containsIgnoreCase = this._containsIgnoreCase;
    var filterText = this.state.filterText;
    var filteredTeams = this.props.teams.filter(function(team) {
      return containsIgnoreCase(team.name, filterText);
    });

    return (
      <div>
        <SearchBar onFilterTextChanged={this.filterTextChanged}/>
        <TeamTable teams={filteredTeams}/>
      </div>
    );
  },

  _containsIgnoreCase: function (source, stringToContain) {
    return source.toLowerCase().indexOf(stringToContain.toLowerCase()) > -1;
  }

});

module.exports = FilterableTeamTable;
