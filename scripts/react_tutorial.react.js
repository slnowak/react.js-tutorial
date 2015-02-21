'use strict'

var teams = [
  {
    name: "Real Madrid",
    rating: "GOOD"
  },

  {
    name: "Manchester United",
    rating: "GOOD"
  },

  {
    name: "Real Madrid Castilla",
    rating: "POOR"
  },

  {
    name: "Everton",
    rating: "AVERAGE"
  }
];


var FilterableTeamTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: ''
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

var TeamTable = React.createClass({
  render: function() {
    var rows = this.props.teams.map(function(team) {
      return <TeamRow key={team.name} team={team}/>;
    });

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {rows}
          </tbody>
        </table>

      </div>
    );
  }
});

var TeamRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.team.name}</td>
        <td>{this.props.team.rating}</td>
      </tr>
    );
  }
});

var SearchBar = React.createClass({
  handleFilterTextChanged: function() {
    this.props.onFilterTextChanged(
      this.refs.filterText.getDOMNode().value
    );
  },

  render: function() {
    return (
      <input onChange={this.handleFilterTextChanged} type="text" placeholder="Filter by name" ref="filterText" />
    );
  }
});

React.render(
  <FilterableTeamTable teams={teams}/>, document.body
);
