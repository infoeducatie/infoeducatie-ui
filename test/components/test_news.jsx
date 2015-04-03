import React from "react/addons";
let { TestUtils } = React.addons;

import News from "../../src/components/news";


describe("News Component", function() {
  it("should render the correct title", function() {
    let component = TestUtils.renderIntoDocument(
      <News />
    );

    let heading = React.findDOMNode(component.refs.heading);
    expect(heading.textContent).to.equal('News');
  });
});
