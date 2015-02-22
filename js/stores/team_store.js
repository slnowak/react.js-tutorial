var React = require('react');
var McFly = require('mcfly');
var TeamConstants = require('../constants/team_constants.js');

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
    case TeamConstants.ADD_TEAM:
      addTeam(payload.team);
      break;
  }

  TeamStore.emitChange();
});

module.exports = TeamStore;
