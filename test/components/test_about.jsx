import React from "react/addons";
let { TestUtils } = React.addons;

import About from "../../src/components/about";


describe("About Component", function() {
  it("should render the correct title", function() {
    let component = TestUtils.renderIntoDocument(
      <About />
    );

    let heading = TestUtils.findRenderedDOMComponentWithTag(component, "h1");

    expect(heading.getDOMNode().textContent).to.equal('About');
  });
});
