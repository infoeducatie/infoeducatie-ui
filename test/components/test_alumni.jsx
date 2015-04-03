import React from "react/addons";
let { TestUtils } = React.addons;

import Alumni from "../../src/components/alumni";


describe("Alumni Component", function() {
  it("should render the correct title", function() {
    let component = TestUtils.renderIntoDocument(
      <Alumni />
    );

    let heading = React.findDOMNode(component.refs.heading);
    expect(heading.textContent).to.equal('Alumni');
  });
});
