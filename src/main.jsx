"use strict";

import * as Sentry from "@sentry/react";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useOutletContext,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main.less";

import FooterEnglish from "./components/english/footer";
import Footer from "./components/footer";
import Home from "./components/home";
import SignInModal from "./components/sign-in-modal";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "./lib/auth-token";
import { initializeAnalytics } from "./lib/analytics";
import { navigate, NavigationBridge } from "./lib/navigation";
import request from "./lib/request";

const About = lazy(() => import("./components/about"));
const Alumni = lazy(() => import("./components/alumni"));
const Contact = lazy(() => import("./components/contact"));
const Contestants = lazy(() => import("./components/contestants/contestants"));
const AboutEnglish = lazy(() => import("./components/english/about"));
const ContactEnglish = lazy(() => import("./components/english/contact"));
const HomeEnglish = lazy(() => import("./components/english/home"));
const PhotoEnglish = lazy(() => import("./components/english/photos"));
const Jury = lazy(() => import("./components/jury"));
const Photos = lazy(() => import("./components/photos"));
const Register = lazy(() => import("./components/register"));
const RegisterInContest = lazy(
  () => import("./components/register-in-contest"),
);
const Results = lazy(() => import("./components/results"));
const RoboticsCompetition = lazy(
  () => import("./components/robotics/robotics-competition"),
);
const Schedule = lazy(() => import("./components/schedule"));
const Talks = lazy(() => import("./components/talks"));

const englishRoutes = new Set(["/home", "/about", "/contact", "/photos"]);

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
  const location = useLocation();
  const [current, setCurrent] = useState(defaultCurrent);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getAccessToken()));
  const language = englishRoutes.has(location.pathname) ? "en" : "ro";

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const canonicalUrl = new URL(location.pathname, window.location.origin).href;
    const canonical = document.querySelector('link[rel="canonical"]');
    const openGraphUrl = document.querySelector('meta[property="og:url"]');

    if (canonical) canonical.href = canonicalUrl;
    if (openGraphUrl) openGraphUrl.content = canonicalUrl;
  }, [location.pathname]);

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
      <a className="skip-link" href="#main-content">
        Sari la conținut
      </a>
      <main id="main-content" tabIndex="-1">
        <Outlet context={routeContext} />
      </main>
      <footer aria-label={language === "ro" ? "Subsol" : "Footer"}>
        {language === "ro" ? <Footer current={current} /> : <FooterEnglish />}
      </footer>
      <SignInModal login={login} />
    </div>
  );
}

function RouteContent({ component: Component }) {
  const appProps = useOutletContext();
  return (
    <Suspense
      fallback={
        <div className="route-loading" role="status" aria-live="polite">
          <span className="visually-hidden">Se încarcă pagina...</span>
        </div>
      }
    >
      <Component {...appProps} />
    </Suspense>
  );
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
  { path: "rezultate", component: Results },
  { path: "robotica/:slug", component: RoboticsCompetition },
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
          <Route path="calendar" element={<Navigate replace to="/program" />} />
          <Route path="kitchen" element={<Navigate replace to="/" />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Sentry.ErrorBoundary>,
);

export default App;
