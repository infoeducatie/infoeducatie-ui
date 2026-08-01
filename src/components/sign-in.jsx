"use strict";


import { navigate } from "@lib/navigation";
import { useTranslation } from "react-i18next";

export default function SignIn() {
  const { t } = useTranslation("forms");
  const openModal = (event) => {
    event.preventDefault();
    navigate({
      pathname: window.location.pathname,
      query: { login: true },
    });
  };

  return (
    <a href="?login=true" onClick={openModal}>
      {t("signIn.link")}
    </a>
  );
}
