import React from "react";


export default class HomePage extends React.Component {
  componentWillMount() {
    console.log("[HomePage] will mount with server response: ", this.props.data.home);
  }

  render() {
    let { title } = this.props.data.home;

    return (
      <div id="home-page">
        <h1>{title}</h1>
      </div>
    );
  }
}
