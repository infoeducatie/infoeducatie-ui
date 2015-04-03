import React from "react/addons";
let { TestUtils } = React.addons;

import News from "../../src/components/news";


describe("News Component", function() {
  it("should render the correct title", function() {
    let component = TestUtils.renderIntoDocument(
      <News />
    );

    let heading = TestUtils.findRenderedDOMComponentWithTag(component, "h1");

    expect(heading.getDOMNode().textContent).to.equal('News');
  });
});
