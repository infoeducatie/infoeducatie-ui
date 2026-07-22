import ReactGA from "react-ga4";

let enabled = false;

export function initializeAnalytics(measurementId) {
  if (!measurementId || !measurementId.startsWith("G-")) {
    return;
  }

  ReactGA.initialize(measurementId);
  enabled = true;
}

export function trackPageView(path) {
  if (!enabled) return;

  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
}
