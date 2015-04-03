import React from "react/addons";
let { TestUtils } = React.addons;

import Register from "../../src/components/register";


describe("Register Component", function() {
  it("should render the correct title", function() {
    let component = TestUtils.renderIntoDocument(
      <Register />
    );

    let heading = TestUtils.findRenderedDOMComponentWithTag(component, "h1");

    expect(heading.getDOMNode().textContent).to.equal('Register');
  });
});
