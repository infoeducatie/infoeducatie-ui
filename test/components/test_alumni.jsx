import React from "react/addons";
let { TestUtils } = React.addons;

import Alumni from "../../src/components/alumni";


describe("Alumni Component", function() {
  it("should render the correct title", function() {
    let component = TestUtils.renderIntoDocument(
      <Alumni />
    );

    let heading = TestUtils.findRenderedDOMComponentWithTag(component, "h1");

    expect(heading.getDOMNode().textContent).to.equal('Alumni');
  });
});
