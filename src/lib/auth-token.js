import Cookies from "js-cookie";

const cookieName = "accesToken";

export function getAccessToken() {
  return Cookies.get(cookieName);
}

export function setAccessToken(token) {
  Cookies.set(cookieName, token, {
    sameSite: "strict",
    secure: window.location.protocol === "https:",
  });
}

export function removeAccessToken() {
  Cookies.remove(cookieName, {
    sameSite: "strict",
    secure: window.location.protocol === "https:",
  });
}
