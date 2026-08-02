"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { Row, Modal } from "@ui/bootstrap";
import { Pin } from "lucide-react";
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

  renderOverlay(date) {
    return (
      <Modal
        centered
        className="news-modal"
        scrollable
        show={this.state.isModalOpen}
        onHide={this.closeModal}
      >
        <Modal.Header closeButton>
          <div className="news-modal-heading">
            <p className="news-modal-date">{date}</p>
            <Modal.Title>{this.props.title}</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            className="news-modal-body"
            dangerouslySetInnerHTML={{__html: this.props.body}}
          />
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
      <Row>
        <div className="news-meta">
          <p className="date">{date}</p>
          {this.props.pinned ? (
            <span className="pinned-indicator" title={this.props.t("news.pinned")}>
              <Pin aria-hidden="true" size={17} strokeWidth={2.3} />
              <span className="visually-hidden">{this.props.t("news.pinned")}</span>
            </span>
          ) : null}
        </div>
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
      { this.renderOverlay(date) }
    </article>;
  }
});

export default withTranslation("public")(Article);
