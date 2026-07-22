"use strict";

import request from "@lib/request";

import createLegacyComponent from "@lib/create-legacy-component";
import { Modal } from "@ui/bootstrap";
import { navigate, withLocation } from "@lib/navigation";

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
          <Modal.Title>Autentificare</Modal.Title>
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
        Dacă nu ai un cont,&nbsp;
        <a href="/inregistrare" onClick={this.onRegisterClick}>creează unul nou aici</a>.
      </p>
      <p>
       Dacă ai uitat parola&nbsp;
       <a
         href="https://api.infoeducatie.ro/users/password/new"
         target="_blank"
         rel="noreferrer"
       >
         click aici
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

export default withLocation(SignInModal);
