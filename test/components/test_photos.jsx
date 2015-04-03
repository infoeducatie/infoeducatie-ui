import React from "react/addons";
let { TestUtils } = React.addons;

import Photos from "../../src/components/photos";


describe("Photos Component", function() {
  it("should render the correct title", function() {
    let component = TestUtils.renderIntoDocument(
      <Photos />
    );

    let heading = React.findDOMNode(component.refs.heading);
    expect(heading.textContent).to.equal('Photos');
  });
});
