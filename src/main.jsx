"use strict";

import * as Sentry from "@sentry/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main.less";

import About from "./components/about";
import Alumni from "./components/alumni";
import Calendar from "./components/calendar";
import Contact from "./components/contact";
import Contestants from "./components/contestants/contestants";
import AboutEnglish from "./components/english/about";
import ContactEnglish from "./components/english/contact";
import FooterEnglish from "./components/english/footer";
import HomeEnglish from "./components/english/home";
import PhotoEnglish from "./components/english/photos";
import Footer from "./components/footer";
import Home from "./components/home";
import Jury from "./components/jury";
import Kitchen from "./components/kitchen";
import Photos from "./components/photos";
import Register from "./components/register";
import RegisterInContest from "./components/register-in-contest";
import Results from "./components/results";
import Schedule from "./components/schedule";
import SignInModal from "./components/sign-in-modal";
import Talks from "./components/talks";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "./lib/auth-token";
import { initializeAnalytics } from "./lib/analytics";
import { navigate, NavigationBridge } from "./lib/navigation";
import request from "./lib/request";

const defaultCurrent = {
  edition: {
    motto: "Persevereaza, mergi mai departe!",
    year: 2017,
    id: 1,
    count: 22,
  },
  stats: {
    total_participants: 0,
    total_projects: 0,
    total_counties: 0,
  },
  last_edition_with_results: {
    year: 2014,
    id: 0,
    name: "Editia 2017 Online",
  },
};

function App() {
  const [current, setCurrent] = useState(defaultCurrent);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getAccessToken()));
  const [language, setLanguage] = useState("ro");

  const getCurrent = useCallback(() => {
    const accessToken = getAccessToken();
    const headers = accessToken ? { Authorization: accessToken } : {};

    request({
      method: "GET",
      url: `${window.config.API_URL}current.json`,
      headers,
      success: (data) => {
        setCurrent(data);
        setIsLoggedIn(data.is_logged_in);
      },
      error: (response) => {
        Sentry.captureMessage("Unable to load current InfoEducatie edition", {
          level: "warning",
          extra: { status: response.status },
        });
      },
    });
  }, []);

  useEffect(() => {
    getCurrent();
  }, [getCurrent]);

  const changeLanguage = useCallback((newLanguage) => {
    setLanguage(newLanguage);
    navigate(newLanguage === "en" ? "/home" : "/");
  }, []);

  const login = useCallback(
    (user) => {
      setAccessToken(user.access_token);
      getCurrent();
      navigate("/inscriere");
    },
    [getCurrent],
  );

  const logout = useCallback(() => {
    removeAccessToken();
    setIsLoggedIn(false);
    getCurrent();
    navigate("/");
  }, [getCurrent]);

  const routeContext = useMemo(
    () => ({
      current,
      edition: current.edition,
      user: current.user,
      registration: current.registration,
      refreshCurrent: getCurrent,
      isLoggedIn,
      language,
      changeLanguage,
      logout,
      lastEditionWithResults: current.last_edition_with_results,
    }),
    [changeLanguage, current, getCurrent, isLoggedIn, language, logout],
  );

  return (
    <div className="main">
      <Outlet context={routeContext} />
      {language === "ro" ? <Footer current={current} /> : <FooterEnglish />}
      <SignInModal login={login} />
    </div>
  );
}

function RouteContent({ component: Component }) {
  const appProps = useOutletContext();
  return <Component {...appProps} />;
}

const routeComponents = [
  { index: true, component: Home },
  { path: "acasa", component: Home },
  { path: "juriu", component: Jury },
  { path: "inscriere", component: RegisterInContest },
  { path: "alumni", component: Alumni },
  { path: "poze", component: Photos },
  { path: "contacte", component: Contact },
  { path: "despre", component: About },
  { path: "inregistrare", component: Register },
  { path: "calendar", component: Calendar },
  { path: "rezultate", component: Results },
  { path: "kitchen", component: Kitchen },
  { path: "participanti", component: Contestants },
  { path: "home", component: HomeEnglish },
  { path: "about", component: AboutEnglish },
  { path: "contact", component: ContactEnglish },
  { path: "photos", component: PhotoEnglish },
  { path: "seminarii", component: Talks },
  { path: "program", component: Schedule },
];

if (window.config.SENTRY_DSN) {
  Sentry.init({
    dsn: window.config.SENTRY_DSN,
    allowUrls: [/((ui\.dev|www|new)\.)?infoeducatie\.ro/],
  });
}

initializeAnalytics(window.config.GA_TRACKING_ID);

const root = createRoot(document.getElementById("app"));
root.render(
  <Sentry.ErrorBoundary fallback={<p>Pagina nu a putut fi incarcata.</p>}>
    <BrowserRouter>
      <NavigationBridge />
      <Routes>
        <Route path="/" element={<App />}>
          {routeComponents.map(({ component, index, path }) => (
            <Route
              key={path || "index"}
              index={index}
              path={path}
              element={<RouteContent component={component} />}
            />
          ))}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Sentry.ErrorBoundary>,
);

export default App;
