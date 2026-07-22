"use strict";


import { navigate } from "@lib/navigation";

export default function SignIn() {
  const openModal = (event) => {
    event.preventDefault();
    navigate({
      pathname: window.location.pathname,
      query: { login: true },
    });
  };

  return (
    <a href="?login=true" onClick={openModal}>
      autentifica aici
    </a>
  );
}
