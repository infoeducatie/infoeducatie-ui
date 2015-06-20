"use strict";

import React from "react";


export default React.createClass({
  displayName: "GalaciucPage",

  render() {
    return <div>
      <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
      <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
      <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
      <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
      <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
      <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p><a href="#" className="link link-primary">Link Primary</a></p>
      <p><a href="#" className="link link-secondary">Link Secondary</a></p>
      <p><a href="#" className="link link-ternary">Link Ternary</a></p>
    </div>;
  }
});
