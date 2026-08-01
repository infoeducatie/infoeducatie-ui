"use strict";

import * as Sentry from "@sentry/react";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import { useTranslation } from "react-i18next";
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

import Footer from "./components/footer";
import Home from "./components/home";
import NotFound from "./components/not-found";
import SignInModal from "./components/sign-in-modal";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "./lib/auth-token";
import { initializeAnalytics } from "./lib/client-events";
import { persistLanguage } from "./lib/i18n";
import { getLocalizedPath } from "./lib/localized-routes";
import { navigate, NavigationBridge } from "./lib/navigation";
import request from "./lib/request";
import { getRouteMetadata } from "./lib/route-metadata";

const About = lazy(() => import("./components/about"));
const Alumni = lazy(() => import("./components/alumni"));
const Blog = lazy(() => import("./components/blog"));
const BlogArticle = lazy(() => import("./components/blog/article"));
const Contact = lazy(() => import("./components/contact"));
const Contestants = lazy(() => import("./components/contestants/contestants"));
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
  const previousPath = useRef(location.pathname);
  const { i18n, t } = useTranslation();
  const [current, setCurrent] = useState(defaultCurrent);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getAccessToken()));
  const language = i18n.resolvedLanguage || "ro";

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const metadata = getRouteMetadata(location.pathname, language);
    const canonicalUrl = new URL(location.pathname, window.location.origin).href;
    const canonical = document.querySelector('link[rel="canonical"]');
    const description = document.querySelector('meta[name="description"]');
    const openGraphTitle = document.querySelector('meta[property="og:title"]');
    const openGraphDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    const openGraphUrl = document.querySelector('meta[property="og:url"]');

    document.title = metadata.title;
    if (canonical) canonical.href = canonicalUrl;
    if (description) description.content = metadata.description;
    if (openGraphTitle) openGraphTitle.content = metadata.title;
    if (openGraphDescription) {
      openGraphDescription.content = metadata.description;
    }
    if (openGraphUrl) openGraphUrl.content = canonicalUrl;
  }, [language, location.pathname]);

  useEffect(() => {
    if (previousPath.current === location.pathname) return undefined;

    previousPath.current = location.pathname;
    window.scrollTo({ left: 0, top: 0, behavior: "auto" });

    const animationFrame = window.requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(animationFrame);
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

  const changeLanguage = useCallback(
    (newLanguage) => {
      persistLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
    },
    [i18n],
  );

  const login = useCallback(
    (user) => {
      setAccessToken(user.access_token);
      getCurrent();
      navigate(getLocalizedPath("contestEntry"));
    },
    [getCurrent],
  );

  const logout = useCallback(() => {
    removeAccessToken();
    setIsLoggedIn(false);
    getCurrent();
    navigate(getLocalizedPath("home"));
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
      t,
      lastEditionWithResults: current.last_edition_with_results,
    }),
    [changeLanguage, current, getCurrent, isLoggedIn, language, logout, t],
  );

  return (
    <div className="main">
      <a className="skip-link" href="#main-content">
        {t("accessibility.skipToContent")}
      </a>
      <main id="main-content" tabIndex="-1">
        <Outlet context={routeContext} />
      </main>
      <footer aria-label={t("footer.label")}>
        <Footer current={current} language={language} />
      </footer>
      <SignInModal language={language} login={login} />
    </div>
  );
}

function RouteContent({ component: Component }) {
  const appProps = useOutletContext();
  return (
    <Suspense
      fallback={
        <div className="route-loading" role="status" aria-live="polite">
          <span className="visually-hidden">
            {appProps.t("loading.route")}
          </span>
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
  { path: "blog", component: Blog },
  { path: "blog/:slug", component: BlogArticle },
  { path: "poze", component: Photos },
  { path: "contacte", component: Contact },
  { path: "despre", component: About },
  { path: "inregistrare", component: Register },
  { path: "rezultate", component: Results },
  { path: "robotica/:slug", component: RoboticsCompetition },
  { path: "participanti", component: Contestants },
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
          <Route path="home" element={<Navigate replace to="/" />} />
          <Route path="about" element={<Navigate replace to="/despre" />} />
          <Route path="contact" element={<Navigate replace to="/contacte" />} />
          <Route path="photos" element={<Navigate replace to="/poze" />} />
          <Route
            path="*"
            element={<RouteContent component={NotFound} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </Sentry.ErrorBoundary>,
);

export default App;
