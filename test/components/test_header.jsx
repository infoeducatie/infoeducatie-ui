import React from "react/addons";
let { TestUtils } = React.addons;

import Header from "../../src/components/header";


describe("Header Component", function() {
  it("should render the correct title", function() {
    debugger;
    let component = TestUtils.renderIntoDocument(
      <Header />
    );

    //let nav = TestUtils.findRenderedDOMComponentWithTag(component, "nav");
    let nav = React.findDOMNode(component.ref.nav);
    //expect(nav.getDOMNode().).to.equal('Header');
  });
});
