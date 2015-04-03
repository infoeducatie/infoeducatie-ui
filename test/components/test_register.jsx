import React from "react/addons";
let { TestUtils } = React.addons;

import Register from "../../src/components/register";


describe("Register Component", function() {
  it("should render the correct title", function() {
    let component = TestUtils.renderIntoDocument(
      <Register />
    );

    let heading = React.findDOMNode(component.refs.heading);
    expect(heading.textContent).to.equal('Register');
  });
});
