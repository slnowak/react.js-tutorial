var React = require("react");
var Table = require("react-bootstrap").Table;
var TeamRow = require("./team_row.js");

var TeamTable = React.createClass({
  render: function() {
    var rows = this.props.teams.map(function(team) {
      return <TeamRow key={team.name} team={team}/>;
    });

    return (
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {rows}
          </tbody>
        </Table>
    );
  }
});

module.exports = TeamTable;
