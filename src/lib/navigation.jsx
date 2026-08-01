import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { trackPageView } from "./client-events";

let navigateWithRouter = null;

function normalizeDestination(destination) {
  if (typeof destination === "string") {
    return destination;
  }

  const search = new URLSearchParams(destination.query || {}).toString();
  return {
    pathname: destination.pathname || window.location.pathname,
    search: search ? `?${search}` : "",
  };
}

export function navigate(destination, options) {
  const normalizedDestination = normalizeDestination(destination);

  if (navigateWithRouter) {
    navigateWithRouter(normalizedDestination, options);
    return;
  }

  const fallbackUrl =
    typeof normalizedDestination === "string"
      ? normalizedDestination
      : `${normalizedDestination.pathname}${normalizedDestination.search}`;
  window.location.assign(fallbackUrl);
}

export function NavigationBridge() {
  const routerNavigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigateWithRouter = routerNavigate;
    return () => {
      navigateWithRouter = null;
    };
  }, [routerNavigate]);

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`);
  }, [location]);

  return null;
}

export function withLocation(Component) {
  function ComponentWithLocation(props) {
    const location = useLocation();
    return <Component {...props} location={location} />;
  }

  ComponentWithLocation.displayName = `withLocation(${Component.displayName || Component.name})`;
  return ComponentWithLocation;
}
