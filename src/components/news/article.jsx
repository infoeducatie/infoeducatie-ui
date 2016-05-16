"use strict";

import React from "react";
import { Row, Modal } from "react-bootstrap";
import $ from "jquery";
import _ from "lodash";


export default React.createClass({
  displayName: "News",

  getInitialState() {
    return {
      isModalOpen: false
    };
  },

  openModal() {
    this.setState({
      isModalOpen: true
    });
  },

  closeModal() {
    this.setState({
      isModalOpen: false
    });
  },

  renderOverlay() {
    return (
      <Modal show={this.state.isModalOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{__html: this.props.body}} />
        </Modal.Body>
      </Modal>
    );
  },

  render() {
    let date = new Date(this.props.created_at).toLocaleDateString();

    let read_more = null;
    if (this.props.body !== "") {
      read_more = <span>...<br /><a className="read-more"
                     onClick={this.openModal}>
                    Citește mai multe...
                  </a></span>;
    }

    return <div>
      <Row className="xsmall-spacing" />
      <Row>
        <p className="date">{date}</p>
        <p className="title">{this.props.title}</p>
        <p className="message">
          {this.props.short} {read_more}</p>
      </Row>
      { this.renderOverlay() }
    </div>;
  }
});
