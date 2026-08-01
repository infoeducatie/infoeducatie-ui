"use strict";

import request from "@lib/request";

import createLegacyComponent from "@lib/create-legacy-component";
import { Modal } from "@ui/bootstrap";
import { navigate, withLocation } from "@lib/navigation";
import { withTranslation } from "react-i18next";

import SignInForm from "./sign-in-form";


const SignInModal = createLegacyComponent({
  displayName: "SignInModal",

  getInitialState() {
    return {
      hasErrored: false
    };
  },

  closeModal() {
    navigate({
      pathname: window.location.pathname,
      query: { }
    });
  },

  onSignIn(formData) {
    let data = { };
    data["user[email]"] = formData.email;
    data["user[password]"] = formData.password;

    request({
      url: window.config.API_URL + "sign_in",
      method: "POST",
      success: this.onSignInSuccess,
      error: this.onSignInError,
      data: data
    });
  },

  onSignInSuccess(data) {
    this.closeModal();
    this.props.login(data);
  },

  onSignInError() {
    this.setState({
      hasErrored: true
    });
  },

  showModal() {
    return this.props.location.search.includes("login=true");
  },

  render() {
    return (
      <Modal show={this.showModal()} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.t("signIn.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignInForm onSignIn={this.onSignIn}
                      hasErrored={this.state.hasErrored} />
          {this.renderRegisterMessage()}
        </Modal.Body>
      </Modal>
    );
  },

  renderRegisterMessage() {
    return <div>
      <p>
        {this.props.t("signIn.noAccountPrefix")}&nbsp;
        <a href="/inregistrare" onClick={this.onRegisterClick}>{this.props.t("signIn.createAccount")}</a>.
      </p>
      <p>
       {this.props.t("signIn.forgotPrefix")}&nbsp;
       <a
         href={window.config.PASSWORD_RESET_URL}
         target="_blank"
         rel="noreferrer"
       >
         {this.props.t("signIn.forgotLink")}
       </a>
      </p>
    </div>;
  },

  onRegisterClick(event) {
    event.preventDefault();
    this.closeModal();
    navigate("/inregistrare");
  }
});

export default withTranslation("forms")(withLocation(SignInModal));
