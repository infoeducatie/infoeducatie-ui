"use strict";

import React from "react";
import { Row, OverlayMixin, Modal } from "react-bootstrap";
import $ from "jquery";
import _ from "lodash";


export default React.createClass({
  displayName: "News",
  mixins: [OverlayMixin],

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

  render() {
    let read_more = null;
    if (this.props.body) {
      read_more = <a className="link link-secondary"
                     onClick={this.openModal}>
                    mai mult
                  </a>;
    }

    return <div>
      <Row className="xsmall-spacing" />
      <Row>
        <p className="date">{this.props.date}</p>
        <p className="title">{this.props.title}</p>
        <p className="message">{this.props.small_description} {read_more}</p>
      </Row>
    </div>;
  },

  renderOverlay() {
    if (!this.state.isModalOpen) {
      return null;
    }

    return (
      <Modal animation={true}
             bsStyle="primary"
             onRequestHide={this.closeModal}
             title={this.props.title}>
        <div className="modal-body">
          {this.props.body}
        </div>
      </Modal>
    );
  }
});
