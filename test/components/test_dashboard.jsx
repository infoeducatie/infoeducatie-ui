import React from "react/addons";
let { TestUtils } = React.addons;

import Dashboard from "../../src/components/dashboard";


describe("Dashboard Component", function() {
  it("should render the correct title", function() {
    let component = TestUtils.renderIntoDocument(
      <Dashboard />
    );

    let heading = TestUtils.findRenderedDOMComponentWithTag(component, "h1");

    expect(heading.getDOMNode().textContent).to.equal('Dashboard');
  });
});
