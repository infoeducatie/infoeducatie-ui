import React from "react/addons";
let { TestUtils } = React.addons;

import Galaciuc from "../../src/components/galaciuc";


describe("Galaciuc Component", function() {
  it("should render the correct title", function() {
    let component = TestUtils.renderIntoDocument(
      <Galaciuc />
    );

    let heading = TestUtils.findRenderedDOMComponentWithTag(component, "h1");

    expect(heading.getDOMNode().textContent).to.equal('Galaciuc');
  });
});
