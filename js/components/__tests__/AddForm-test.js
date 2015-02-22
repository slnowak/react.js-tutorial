jest.dontMock('../add_form.js');
jest.dontMock('react/addons');
jest.dontMock('react-bootstrap');

describe('AddForm', function() {


  it('should fire add-team action after submitting form with proper data', function() {
    var AddForm = require('../add_form.js');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var TeamActions = require('../../actions/team_actions');
    var objectUnderTest = TestUtils.renderIntoDocument(<AddForm />);

    objectUnderTest.setNameInputValue('Some Name');
    objectUnderTest.setRatingInputValue('Some Rating');
    var form = TestUtils.findRenderedDOMComponentWithTag(objectUnderTest, 'form');
    TestUtils.Simulate.submit(form);

    expect(TeamActions.addTeam).toBeCalledWith({name: 'Some Name', rating: 'Some Rating'});
  });

  it("should not call addTeam action after submitting form without team name", function() {
    var AddForm = require('../add_form.js');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var TeamActions = require('../../actions/team_actions');
    var objectUnderTest = TestUtils.renderIntoDocument(<AddForm />);

    objectUnderTest.setNameInputValue('');
    objectUnderTest.setRatingInputValue('Some Rating');
    var form = TestUtils.findRenderedDOMComponentWithTag(objectUnderTest, 'form');
    TestUtils.Simulate.submit(form);

    expect(TeamActions.addTeam).not.toBeCalled();
  });

  it("should not call addTeam action after submitting form without team rating", function() {
    var AddForm = require('../add_form.js');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var TeamActions = require('../../actions/team_actions');
    var objectUnderTest = TestUtils.renderIntoDocument(<AddForm />);

    objectUnderTest.setNameInputValue('name');
    objectUnderTest.setRatingInputValue('');
    var form = TestUtils.findRenderedDOMComponentWithTag(objectUnderTest, 'form');
    TestUtils.Simulate.submit(form);

    expect(TeamActions.addTeam).not.toBeCalled();
  });

  it("should clear form after submission", function() {
    var AddForm = require('../add_form.js');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var TeamActions = require('../../actions/team_actions');
    var objectUnderTest = TestUtils.renderIntoDocument(<AddForm />);

    objectUnderTest.setNameInputValue('name');
    objectUnderTest.setRatingInputValue('rating');
    var form = TestUtils.findRenderedDOMComponentWithTag(objectUnderTest, 'form');
    TestUtils.Simulate.submit(form);

    expect(objectUnderTest.getNameInputValue()).toBe('');
    expect(objectUnderTest.getRatingInputValue()).toBe('');
  });





});
