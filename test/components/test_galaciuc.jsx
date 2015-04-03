import React from "react/addons";
let { TestUtils } = React.addons;

import Galaciuc from "../../src/components/galaciuc";


describe("Galaciuc Component", function() {
  it("should render the correct title", function() {
    let component = TestUtils.renderIntoDocument(
      <Galaciuc />
    );

    let heading = React.findDOMNode(component.refs.heading);
    expect(heading.textContent).to.equal('Galaciuc');
  });
});
