import React from "react/addons";
let { TestUtils } = React.addons;

import Photos from "../../src/components/photos";


describe("Photos Component", function() {
  it("should render the correct title", function() {
    let component = TestUtils.renderIntoDocument(
      <Photos />
    );

    let heading = TestUtils.findRenderedDOMComponentWithTag(component, "h1");

    expect(heading.getDOMNode().textContent).to.equal('Photos');
  });
});
