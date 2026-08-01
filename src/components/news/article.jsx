"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { Row, Modal } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";


const Article = createLegacyComponent({
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
    let date = new Date(this.props.created_at).toLocaleDateString(
      this.props.i18n.resolvedLanguage === "en" ? "en-GB" : "ro-RO",
    );

    const canReadMore = this.props.body !== "";

    return <article className="news-article">
      <Row className="xsmall-spacing" />
      <Row>
        <p className="date">{date}</p>
        <p className="title">{this.props.title}</p>
        <p className="message">{this.props.short}{canReadMore ? " …" : ""}</p>
        {canReadMore ? (
          <button className="read-more"
                  type="button"
                  onClick={this.openModal}>
            {this.props.t("news.readMore")}
          </button>
        ) : null}
      </Row>
      { this.renderOverlay() }
    </article>;
  }
});

export default withTranslation("public")(Article);
