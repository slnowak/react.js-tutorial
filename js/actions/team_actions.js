var McFly = require('mcfly');
var Flux = new McFly();
var TeamConstants = require('../constants/team_constants.js');


var TeamActions = Flux.createActions({
  addTeam: function(team) {
    return {
      actionType: TeamConstants.ADD_TEAM,
      team: team
    }
  }
});

module.exports = TeamActions;
