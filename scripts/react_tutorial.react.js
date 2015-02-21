'use strict'

var Flux = new McFly();

var _teams = [
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

function addTeam(team) {
  _teams.push(team);
}

var TeamStore = Flux.createStore({

  getTeams: function() {
    return _teams;
  }

}, function(payload) {
  switch(payload.actionType) {
    case 'ADD_TEAM':
      addTeam(payload.team);
      break;
  }

  TeamStore.emitChange();
});


var TeamActions = Flux.createActions({
  addTeam: function(team) {
    return {
      actionType: 'ADD_TEAM',
      team: team
    }
  }
});

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

var TeamTable = React.createClass({
  render: function() {
    var rows = this.props.teams.map(function(team) {
      return <TeamRow key={team.name} team={team}/>;
    });

    return (
      <div>
        <table className="table table-striped">
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
      <form className="form-inline">
        <div className="form-group">
          <input className="form-control" onChange={this.handleFilterTextChanged} type="text" placeholder="Filter by name" ref="filterText" />
        </div>
      </form>
    );
  }
});


var AddForm = React.createClass({
  handleFormSubmit: function(e) {
    e.preventDefault();

    var name = this._trimmedValue(this.refs.name);
    var rating = this._trimmedValue(this.refs.rating);

    if (name && rating) {
      TeamActions.addTeam(
        {name: name, rating: rating}
      );
      this._clearField(this.refs.name);
      this._clearField(this.refs.rating);
    }
  },

  _trimmedValue: function(field) {
    return field.getDOMNode().value.trim();
  },

  _clearField: function(field) {
    field.getDOMNode().value = '';
  },

  render: function() {
    return (
      <div>
        <form className="horizontal-form" onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label for="input-name" className="control-label">Name</label>
            <input className="form-control" id="input-name" type="text" placeholder="Name" ref="name" />
          </div>
          <div className="form-group">
            <label for="input-rating" className="control-label">Rating</label>
            <input className="form-control" id="input-rating" type="text" placeholder="Rating" ref="rating" />
          </div>
          <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Add!" />
          </div>
        </form>
      </div>
    );
  }
})

React.render(
  <MainComponent/>, document.body
);
