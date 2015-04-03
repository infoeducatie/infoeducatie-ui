"use strict";

import React from "react";
import { Modal, Button, OverlayMixin } from "react-bootstrap";


export default SignIn = React.createClass({
  displayName: "MyModal",
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
    return <a href="#" onClick={this.openModal}>Autentificare</a>;
  },

  renderOverlay() {
    if (!this.state.isModalOpen) {
      return null;
    }

    return (
      <Modal animation={true}
             bsStyle="primary"
             onRequestHide={this.closeModal}
             title="Autentificare">
        <div className="modal-body">
          Aici va veni formularul
        </div>
        <div className="modal-footer">
          <Button bsStyle="primary">Loghează-te</Button>
        </div>
      </Modal>
    );
  }
});
