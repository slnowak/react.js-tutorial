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

  render: function() {
    return (
      <div>
        <SearchBar/>
        <TeamTable teams={this.props.teams}/>
      </div>
    );
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
  render: function() {
    return (
      <input type="text" placeholder="Filter by name" ref="filterText" />
    );
  }
});

React.render(
  <FilterableTeamTable teams={teams}/>, document.body
);
