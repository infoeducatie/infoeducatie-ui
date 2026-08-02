"use strict";

import {
  Clock,
  DoorOpen,
  LogIn,
  LogOut,
  Play,
  RefreshCw,
  ShieldCheck,
  Square,
  Users,
  WifiOff,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Grid } from "@ui/bootstrap";
import {
  authenticateRoboticsTeam,
  claimRoboticsTurn,
  getRoboticsCompetition,
  passRoboticsTurn,
  setRoboticsReadiness,
  stopRoboticsTurn,
} from "@lib/robotics-api";
import {
  clearRoboticsTeamToken,
  getRoboticsTeamToken,
  setRoboticsTeamToken,
} from "@lib/robotics-session";
import {
  boundedPercentage,
  formatCountdown,
  formatDateTime,
  formatDuration,
  secondsUntil,
  timestampMilliseconds,
} from "@lib/robotics-time";

import Header from "../header";

const pollIntervalMilliseconds = 5000;
const staleAfterMilliseconds = 15000;

const competitionStatuses = {
  active: { key: "active", tone: "active" },
  cancelled: { key: "cancelled", tone: "ended" },
  canceled: { key: "cancelled", tone: "ended" },
  completed: { key: "completed", tone: "ended" },
  ended: { key: "completed", tone: "ended" },
  live: { key: "active", tone: "active" },
  paused: { key: "paused", tone: "paused" },
  running: { key: "active", tone: "active" },
  scheduled: { key: "scheduled", tone: "scheduled" },
  upcoming: { key: "scheduled", tone: "scheduled" },
};

const arenaStatuses = {
  active: { key: "active", tone: "active" },
  available: { key: "available", tone: "available" },
  claimable: { key: "offered", tone: "offered" },
  closed: { key: "closed", tone: "ended" },
  cooldown: { key: "turnover", tone: "turnover" },
  idle: { key: "available", tone: "available" },
  in_use: { key: "active", tone: "active" },
  offered: { key: "offered", tone: "offered" },
  paused: { key: "paused", tone: "paused" },
  reserved: { key: "offered", tone: "offered" },
  scheduled: { key: "scheduled", tone: "scheduled" },
  testing: { key: "active", tone: "active" },
  turnover: { key: "turnover", tone: "turnover" },
  unavailable: { key: "paused", tone: "paused" },
};

const teamStatuses = {
  exhausted: { key: "exhausted", tone: "ended" },
  inactive: { key: "inactive", tone: "neutral" },
};

function sameIdentifier(first, second) {
  return first !== null &&
    first !== undefined &&
    second !== null &&
    second !== undefined &&
    String(first) === String(second);
}

function competitionPresentation(competition = {}, t) {
  const status = competitionStatuses[competition.status] || {
    key: "unknown",
    tone: "scheduled",
  };
  return { ...status, label: t(`competitionStatus.${status.key}`) };
}

function arenaPresentation(arena = {}, t) {
  const status = arenaStatuses[arena.status] || {
    key: "updating",
    tone: "turnover",
  };
  return { ...status, label: t(`arenaStatus.${status.key}`) };
}

function competitionClock(competition = {}, nowMilliseconds, t) {
  const startsAt = timestampMilliseconds(competition.starts_at);
  const endsAt = timestampMilliseconds(competition.ends_at);

  if (
    startsAt !== null &&
    startsAt > nowMilliseconds &&
    !["active", "live", "running"].includes(competition.status)
  ) {
    return {
      label: t("clock.untilStart"),
      seconds: secondsUntil(competition.starts_at, nowMilliseconds),
    };
  }

  if (
    ["cancelled", "canceled", "completed", "ended"].includes(
      competition.status,
    ) ||
    (endsAt !== null && endsAt <= nowMilliseconds)
  ) {
    return { label: t("clock.ended"), seconds: 0 };
  }

  return {
    label: t("clock.remaining"),
    seconds: secondsUntil(competition.ends_at, nowMilliseconds),
  };
}

function arenaClock(arena = {}, nowMilliseconds, t) {
  if (arena.status === "active" && arena.session_ends_at) {
    return {
      label: t("clock.turnEnds"),
      seconds: secondsUntil(arena.session_ends_at, nowMilliseconds),
    };
  }

  if (arena.status === "offered" && arena.offer_expires_at) {
    return {
      label: t("clock.confirmWithin"),
      seconds: secondsUntil(arena.offer_expires_at, nowMilliseconds),
    };
  }

  if (
    ["scheduled", "turnover"].includes(arena.status) &&
    arena.available_at
  ) {
    return {
      label: t("clock.availableWithin"),
      seconds: secondsUntil(arena.available_at, nowMilliseconds),
    };
  }

  if (arena.status === "available") {
    return { label: t("clock.availableNow"), seconds: 0 };
  }

  if (arena.status === "closed") {
    return { label: t("clock.ended"), seconds: 0 };
  }

  return { label: t("clock.noActiveTurn"), seconds: null };
}

function arenaDescription(arena = {}, t) {
  const presentation = arenaPresentation(arena, t);

  if (presentation.tone === "active") {
    return t("arena.active");
  }

  if (presentation.tone === "offered") {
    return t("arena.offered");
  }

  if (presentation.tone === "available") {
    return t("arena.available");
  }

  if (presentation.tone === "turnover") {
    return t("arena.turnover");
  }

  return t("arena.unavailable");
}

function teamPresentation(team, snapshot, nowMilliseconds, t) {
  const arena = snapshot.arena || {};
  const queue = Array.isArray(snapshot.queue) ? snapshot.queue : [];
  const queueEntry = queue.find((entry) =>
    sameIdentifier(entry.team_id, team.id),
  );
  const queuePosition = team.queue_position || queueEntry?.position;
  const cooldown = secondsUntil(team.cooldown_until, nowMilliseconds);

  if (sameIdentifier(arena.team_id, team.id)) {
    const currentArena = arenaPresentation(arena, t);
    return {
      label:
        currentArena.tone === "offered"
          ? t("teamStatus.confirm")
          : currentArena.label,
      tone: currentArena.tone,
    };
  }

  if (queuePosition) {
    return {
      label: t("teamStatus.queued", { position: queuePosition }),
      tone: "queued",
    };
  }

  if (cooldown !== null && cooldown > 0) {
    return {
      label: t("teamStatus.cooldown", { duration: formatCountdown(cooldown) }),
      tone: "turnover",
    };
  }

  if (Number(team.remaining_seconds) <= 0) {
    return { label: t("teamStatus.exhausted"), tone: "ended" };
  }

  if (teamStatuses[team.status]) {
    const status = teamStatuses[team.status];
    return { ...status, label: t(`teamStatus.${status.key}`) };
  }

  if (team.ready) {
    return { label: t("teamStatus.ready"), tone: "available" };
  }

  const knownStatus = arenaStatuses[team.status];
  if (knownStatus) {
    return { ...knownStatus, label: t(`arenaStatus.${knownStatus.key}`) };
  }

  return { label: t("teamStatus.available"), tone: "neutral" };
}

function statusAnnouncement(snapshot, t) {
  if (!snapshot) {
    return "";
  }

  const competition = competitionPresentation(snapshot.competition, t);
  const arena = arenaPresentation(snapshot.arena, t);
  const teamName = snapshot.arena?.team_name;
  const teamMessage = teamName ? t("announcementTeam", { team: teamName }) : "";

  return t("announcement", {
    arena: arena.label,
    competition: competition.label.toLowerCase(),
    team: teamMessage,
  });
}

function StatusChip({ label, tone }) {
  return (
    <span className={`robotics-status robotics-status-${tone}`}>
      <span aria-hidden="true" className="robotics-status-dot" />
      {label}
    </span>
  );
}

function Countdown({ label, seconds }) {
  const hasCountdown = seconds !== null && seconds !== undefined;
  const visibleValue = hasCountdown ? formatCountdown(seconds) : "––:––:––";

  return (
    <div className="robotics-countdown">
      <span className="robotics-countdown-label">{label}</span>
      <time aria-label={`${label}: ${visibleValue}`}>{visibleValue}</time>
    </div>
  );
}

function LiveOverview({ nowMilliseconds, snapshot }) {
  const { i18n, t } = useTranslation("robotics");
  const language = i18n.resolvedLanguage || "ro";
  const competition = snapshot.competition || {};
  const arena = snapshot.arena || {};
  const currentCompetitionClock = competitionClock(
    competition,
    nowMilliseconds,
    t,
  );
  const currentArenaClock = arenaClock(arena, nowMilliseconds, t);
  const currentArena = arenaPresentation(arena, t);
  const turnDuration = formatDuration(competition.turn_duration_seconds);

  return (
    <>
      <section
        aria-label={t("clock.aria")}
        className="robotics-clock-strip"
      >
        <div className="robotics-clock-period">
          <span className="robotics-clock-label">{t("clock.label")}</span>
          <strong>{formatDateTime(competition.starts_at, language, t("clock.unscheduled"))}</strong>
          <span>{t("clock.until", { date: formatDateTime(competition.ends_at, language, t("clock.unscheduled")) })}</span>
        </div>
        <Countdown
          label={currentCompetitionClock.label}
          seconds={currentCompetitionClock.seconds}
        />
        <Countdown
          label={currentArenaClock.label}
          seconds={currentArenaClock.seconds}
        />
      </section>

      <section
        aria-labelledby="robotics-arena-title"
        className={`robotics-arena robotics-arena-${currentArena.tone}`}
      >
        <div className="robotics-arena-state">
          <span className="robotics-arena-icon" aria-hidden="true">
            {currentArena.tone === "available" ? (
              <DoorOpen size={28} />
            ) : (
              <ShieldCheck size={28} />
            )}
          </span>
          <div>
            <StatusChip
              label={currentArena.label}
              tone={currentArena.tone}
            />
            <h2 id="robotics-arena-title">
              {arena.team_name || t("arena.free")}
            </h2>
            <p>{arenaDescription(arena, t)}</p>
          </div>
        </div>
        <div className="robotics-arena-rule">
          <Clock aria-hidden="true" size={20} />
          <span>
            {t("arena.rule", { duration: turnDuration })}
          </span>
        </div>
      </section>
    </>
  );
}

function LoadingState() {
  const { t } = useTranslation("robotics");
  return (
    <section
      aria-busy="true"
      className="robotics-loading"
      role="status"
    >
      <span className="visually-hidden">
        {t("loading")}
      </span>
      <div className="robotics-loading-line robotics-loading-line-short" />
      <div className="robotics-loading-line" />
      <div className="robotics-loading-panels">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

function PublicError({ message, onRetry }) {
  const { t } = useTranslation("robotics");
  return (
    <section className="robotics-page-error" role="alert">
      <WifiOff aria-hidden="true" size={32} />
      <div>
        <h2>{t("errorTitle")}</h2>
        <p>{message}</p>
      </div>
      <button
        className="robotics-button robotics-button-primary"
        onClick={onRetry}
        type="button"
      >
        <RefreshCw aria-hidden="true" size={18} />
        {t("retry")}
      </button>
    </section>
  );
}

function TeamAccess({
  actionError,
  actionNotice,
  authError,
  onAction,
  onAuthenticate,
  onLogout,
  pendingAction,
  pin,
  setPin,
  snapshot,
}) {
  const { t } = useTranslation("robotics");
  const viewer = snapshot.viewer;
  const teams = Array.isArray(snapshot.teams) ? snapshot.teams : [];
  const viewerTeam = viewer
    ? teams.find((team) => sameIdentifier(team.id, viewer.team_id))
    : null;
  const capabilities = viewer?.capabilities || {};

  if (!viewer) {
    return (
      <section
        aria-labelledby="robotics-team-access-title"
        className="robotics-access"
      >
        <div className="robotics-access-copy">
          <LogIn aria-hidden="true" size={28} />
          <div>
            <h2 id="robotics-team-access-title">{t("access.title")}</h2>
            <p>{t("access.description")}</p>
          </div>
        </div>
        <form className="robotics-pin-form" onSubmit={onAuthenticate}>
          <div className="robotics-pin-field">
            <label htmlFor="robotics-team-pin">{t("access.pin")}</label>
            <input
              aria-describedby={
                authError ? "robotics-auth-error" : "robotics-pin-help"
              }
              autoComplete="one-time-code"
              id="robotics-team-pin"
              inputMode="numeric"
              maxLength="24"
              onChange={(event) => setPin(event.currentTarget.value)}
              placeholder={t("access.pinPlaceholder")}
              required
              type="password"
              value={pin}
            />
            <span id="robotics-pin-help">
              {t("access.pinHelp")}
            </span>
          </div>
          <button
            className="robotics-button robotics-button-primary"
            disabled={pendingAction === "authenticate"}
            type="submit"
          >
            <LogIn aria-hidden="true" size={18} />
            {pendingAction === "authenticate" ? t("access.checking") : t("access.enter")}
          </button>
        </form>
        {authError ? (
          <p className="robotics-inline-error" id="robotics-auth-error" role="alert">
            {authError}
          </p>
        ) : null}
        {actionNotice ? (
          <p className="robotics-inline-notice" role="status">
            {actionNotice}
          </p>
        ) : null}
      </section>
    );
  }

  const hasPrimaryAction =
    capabilities.claim ||
    capabilities.stop ||
    capabilities.join_queue ||
    capabilities.leave_queue ||
    capabilities.pass;

  return (
    <section
      aria-labelledby="robotics-team-controls-title"
      className="robotics-access robotics-access-authenticated"
    >
      <div className="robotics-team-identity">
        <ShieldCheck aria-hidden="true" size={28} />
        <div>
          <span>{t("access.active")}</span>
          <h2 id="robotics-team-controls-title">
            {viewerTeam?.name || t("access.yourTeam")}
          </h2>
          <p>
            {viewerTeam
              ? t("access.time", {
                  allocated: formatDuration(viewerTeam.allocated_seconds),
                  remaining: formatDuration(viewerTeam.remaining_seconds),
                })
              : t("access.limited")}
          </p>
        </div>
      </div>

      <div className="robotics-team-actions" aria-label={t("access.actions")}>
        {capabilities.claim ? (
          <button
            className="robotics-button robotics-button-primary"
            disabled={Boolean(pendingAction)}
            onClick={() => onAction("claim")}
            type="button"
          >
            <Play aria-hidden="true" size={18} />
            {pendingAction === "claim" ? t("access.starting") : t("access.start")}
          </button>
        ) : null}
        {capabilities.stop ? (
          <button
            className="robotics-button robotics-button-danger"
            disabled={Boolean(pendingAction)}
            onClick={() => onAction("stop")}
            type="button"
          >
            <Square aria-hidden="true" size={17} />
            {pendingAction === "stop" ? t("access.stopping") : t("access.stop")}
          </button>
        ) : null}
        {capabilities.join_queue ? (
          <button
            className="robotics-button robotics-button-primary"
            disabled={Boolean(pendingAction)}
            onClick={() => onAction("join")}
            type="button"
          >
            <Users aria-hidden="true" size={18} />
            {pendingAction === "join" ? t("access.joining") : t("access.join")}
          </button>
        ) : null}
        {capabilities.leave_queue ? (
          <button
            className="robotics-button robotics-button-secondary"
            disabled={Boolean(pendingAction)}
            onClick={() => onAction("leave")}
            type="button"
          >
            <DoorOpen aria-hidden="true" size={18} />
            {pendingAction === "leave" ? t("access.leaving") : t("access.leave")}
          </button>
        ) : null}
        {capabilities.pass ? (
          <button
            className="robotics-button robotics-button-secondary"
            disabled={Boolean(pendingAction)}
            onClick={() => onAction("pass")}
            type="button"
          >
            <RefreshCw aria-hidden="true" size={18} />
            {pendingAction === "pass" ? t("access.passing") : t("access.pass")}
          </button>
        ) : null}
        <button
          className="robotics-button robotics-button-quiet"
          disabled={Boolean(pendingAction)}
          onClick={onLogout}
          type="button"
        >
          <LogOut aria-hidden="true" size={18} />
          {t("access.logout")}
        </button>
      </div>

      {!hasPrimaryAction ? (
        <p className="robotics-team-waiting">
          {t("access.waiting")}
        </p>
      ) : null}
      {actionError ? (
        <p className="robotics-inline-error" role="alert">
          {actionError}
        </p>
      ) : null}
      {actionNotice ? (
        <p className="robotics-inline-notice" role="status">
          {actionNotice}
        </p>
      ) : null}
    </section>
  );
}

function Queue({ queue }) {
  const { t } = useTranslation("robotics");
  const sortedQueue = [...queue].sort(
    (first, second) => Number(first.position) - Number(second.position),
  );

  return (
    <section aria-labelledby="robotics-queue-title" className="robotics-queue">
      <div className="robotics-section-heading">
        <div>
          <span className="robotics-eyebrow">{t("queue.eyebrow")}</span>
          <h2 id="robotics-queue-title">{t("queue.title")}</h2>
        </div>
        <span className="robotics-queue-count">
          {t("queue.count", { count: sortedQueue.length })}
        </span>
      </div>

      {sortedQueue.length ? (
        <ol className="robotics-queue-list">
          {sortedQueue.map((entry) => (
            <li key={entry.team_id}>
              <span className="robotics-queue-position">
                {entry.position}
              </span>
              <span>
                <strong>{entry.team_name}</strong>
                <small>{t("queue.ready")}</small>
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <div className="robotics-empty-state">
          <DoorOpen aria-hidden="true" size={28} />
          <p>{t("queue.empty")}</p>
        </div>
      )}
    </section>
  );
}

function TeamsTable({ nowMilliseconds, snapshot }) {
  const { t } = useTranslation("robotics");
  const teams = Array.isArray(snapshot.teams) ? snapshot.teams : [];
  const sortedTeams = [...teams].sort(
    (first, second) => Number(first.position) - Number(second.position),
  );

  return (
    <section aria-labelledby="robotics-teams-title" className="robotics-teams">
      <div className="robotics-section-heading">
        <div>
          <span className="robotics-eyebrow">{t("teams.eyebrow")}</span>
          <h2 id="robotics-teams-title">{t("teams.title")}</h2>
        </div>
      </div>

      {sortedTeams.length ? (
        <div className="robotics-team-table-wrap">
          <table className="robotics-team-table">
            <caption className="visually-hidden">
              {t("teams.caption")}
            </caption>
            <thead>
              <tr>
                <th scope="col">{t("teams.team")}</th>
                <th scope="col">{t("teams.status")}</th>
                <th scope="col">{t("teams.used")}</th>
                <th scope="col">{t("teams.remaining")}</th>
                <th scope="col">{t("teams.turns")}</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team) => {
                const status = teamPresentation(
                  team,
                  snapshot,
                  nowMilliseconds,
                  t,
                );
                const percentage = boundedPercentage(
                  team.used_seconds,
                  team.allocated_seconds,
                );

                return (
                  <tr
                    className={
                      sameIdentifier(snapshot.arena?.team_id, team.id)
                        ? "robotics-team-current"
                        : undefined
                    }
                    key={team.id}
                  >
                    <th data-label={t("teams.team")} scope="row">
                      <strong>{team.name}</strong>
                    </th>
                    <td data-label={t("teams.status")}>
                      <StatusChip label={status.label} tone={status.tone} />
                    </td>
                    <td data-label={t("teams.used")}>
                      <div className="robotics-team-progress">
                        <progress
                          aria-label={t("teams.progress", {
                            percentage: Math.round(percentage),
                            team: team.name,
                          })}
                          max="100"
                          value={percentage}
                        />
                        <span>{formatDuration(team.used_seconds)}</span>
                      </div>
                    </td>
                    <td data-label={t("teams.remaining")}>
                      <strong>{formatDuration(team.remaining_seconds)}</strong>
                    </td>
                    <td data-label={t("teams.turns")}>
                      {Number(team.turns_completed) || 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="robotics-empty-state">
          <Users aria-hidden="true" size={28} />
          <p>{t("teams.empty")}</p>
        </div>
      )}
    </section>
  );
}

export default function RoboticsCompetition(props) {
  const { t } = useTranslation("robotics");
  const { slug } = useParams();
  const [snapshot, setSnapshot] = useState(null);
  const [teamToken, setTeamTokenState] = useState(() =>
    getRoboticsTeamToken(slug),
  );
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pageError, setPageError] = useState("");
  const [connectionError, setConnectionError] = useState("");
  const [authError, setAuthError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionNotice, setActionNotice] = useState("");
  const [pendingAction, setPendingAction] = useState("");
  const [clockOffset, setClockOffset] = useState(0);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [clientNow, setClientNow] = useState(Date.now());
  const requestSequence = useRef(0);
  const appliedSequence = useRef(0);
  const currentTurnId = snapshot?.arena?.turn_id;

  const applySnapshot = useCallback((nextSnapshot, sequence) => {
    if (!nextSnapshot || !nextSnapshot.competition) {
      throw new Error(t("errors.incomplete"));
    }

    if (sequence < appliedSequence.current) {
      return;
    }

    appliedSequence.current = sequence;
    const receivedAt = Date.now();
    const serverNow = timestampMilliseconds(nextSnapshot.server_now);

    if (serverNow !== null) {
      setClockOffset(serverNow - receivedAt);
    }

    setClientNow(receivedAt);
    setSnapshot(nextSnapshot);
    setLastSyncedAt(receivedAt);
    setPageError("");
    setConnectionError("");
    setIsLoading(false);
  }, [t]);

  const expireTeamSession = useCallback(
    (message = t("notices.expired")) => {
      clearRoboticsTeamToken(slug);
      setTeamTokenState("");
      setSnapshot((currentSnapshot) =>
        currentSnapshot
          ? { ...currentSnapshot, viewer: null }
          : currentSnapshot,
      );
      setActionNotice(message);
    },
    [slug, t],
  );

  const loadCompetition = useCallback(
    async ({ signal, silent = false } = {}) => {
      const sequence = ++requestSequence.current;

      if (!silent) {
        setIsRefreshing(true);
      }

      try {
        const nextSnapshot = await getRoboticsCompetition(slug, {
          signal,
          token: teamToken,
        });
        applySnapshot(nextSnapshot, sequence);
      } catch (requestError) {
        if (requestError.name === "AbortError") {
          return;
        }

        if (requestError.status === 401 && teamToken) {
          expireTeamSession();
          setIsLoading(false);
          return;
        }

        setSnapshot((currentSnapshot) => {
          if (currentSnapshot) {
            setConnectionError(requestError.message);
          } else {
            setPageError(requestError.message);
            setIsLoading(false);
          }
          return currentSnapshot;
        });
      } finally {
        if (!silent) {
          setIsRefreshing(false);
        }
      }
    },
    [applySnapshot, expireTeamSession, slug, teamToken],
  );

  useEffect(() => {
    setTeamTokenState(getRoboticsTeamToken(slug));
    setSnapshot(null);
    setIsLoading(true);
    setPageError("");
    setConnectionError("");
    setAuthError("");
    setActionError("");
    setActionNotice("");
    appliedSequence.current = 0;
  }, [slug]);

  useEffect(() => {
    const activeControllers = new Set();

    const refresh = (silent = true) => {
      const controller = new AbortController();
      activeControllers.add(controller);
      loadCompetition({ signal: controller.signal, silent }).finally(() => {
        activeControllers.delete(controller);
      });
    };

    refresh(false);
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        refresh(true);
      }
    }, pollIntervalMilliseconds);
    const refreshVisiblePage = () => {
      if (document.visibilityState === "visible") {
        refresh(true);
      }
    };
    const refreshOnlinePage = () => refresh(true);

    document.addEventListener("visibilitychange", refreshVisiblePage);
    window.addEventListener("online", refreshOnlinePage);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refreshVisiblePage);
      window.removeEventListener("online", refreshOnlinePage);
      activeControllers.forEach((controller) => controller.abort());
    };
  }, [loadCompetition]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClientNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const initialTitle = document.title;
    return () => {
      document.title = initialTitle;
    };
  }, []);

  useEffect(() => {
    document.title = snapshot?.competition?.name
      ? `${snapshot.competition.name} | InfoEducație`
      : t("page.title");
  }, [snapshot?.competition?.name, t]);

  const performAction = useCallback(
    async (action) => {
      const operations = {
        claim: () =>
          claimRoboticsTurn(slug, {
            token: teamToken,
            turnId: currentTurnId,
          }),
        join: () =>
          setRoboticsReadiness(slug, true, { token: teamToken }),
        leave: () =>
          setRoboticsReadiness(slug, false, { token: teamToken }),
        pass: () =>
          passRoboticsTurn(slug, {
            token: teamToken,
            turnId: currentTurnId,
          }),
        stop: () =>
          stopRoboticsTurn(slug, {
            token: teamToken,
            turnId: currentTurnId,
          }),
      };
      const notices = {
        claim: t("notices.claim"),
        join: t("notices.join"),
        leave: t("notices.leave"),
        pass: t("notices.pass"),
        stop: t("notices.stop"),
      };
      const operation = operations[action];

      if (!operation || !teamToken) {
        return;
      }

      const sequence = ++requestSequence.current;
      setPendingAction(action);
      setActionError("");
      setActionNotice("");

      try {
        const nextSnapshot = await operation();
        applySnapshot(nextSnapshot, sequence);
        setActionNotice(notices[action]);
      } catch (requestError) {
        if (requestError.status === 401) {
          expireTeamSession();
        } else if (requestError.status === 409) {
          setActionError(
            `${requestError.message} ${t("notices.refreshing")}`,
          );
          loadCompetition({ silent: true });
        } else {
          setActionError(requestError.message);
        }
      } finally {
        setPendingAction("");
      }
    },
    [
      applySnapshot,
      currentTurnId,
      expireTeamSession,
      loadCompetition,
      slug,
      teamToken,
      t,
    ],
  );

  const authenticateTeam = useCallback(
    async (event) => {
      event.preventDefault();
      const normalizedPin = pin.trim();

      if (!normalizedPin) {
        setAuthError(t("errors.missingPin"));
        return;
      }

      const sequence = ++requestSequence.current;
      setPendingAction("authenticate");
      setAuthError("");
      setActionNotice("");

      try {
        const response = await authenticateRoboticsTeam(slug, normalizedPin);

        if (!response?.token || !response?.state) {
          throw new Error(
            t("errors.session"),
          );
        }

        setRoboticsTeamToken(slug, response.token);
        setTeamTokenState(response.token);
        applySnapshot(response.state, sequence);
        setPin("");
        setActionNotice(t("notices.authenticated"));
      } catch (requestError) {
        setAuthError(
          requestError.status === 401 || requestError.status === 422
            ? t("errors.invalidPin")
            : requestError.message,
        );
      } finally {
        setPendingAction("");
      }
    },
    [applySnapshot, pin, slug, t],
  );

  const logoutTeam = useCallback(() => {
    clearRoboticsTeamToken(slug);
    setTeamTokenState("");
    setActionError("");
    setActionNotice(t("notices.loggedOut"));
    setSnapshot((currentSnapshot) =>
      currentSnapshot
        ? { ...currentSnapshot, viewer: null }
        : currentSnapshot,
    );
  }, [slug, t]);

  const nowMilliseconds = clientNow + clockOffset;
  const staleSeconds = lastSyncedAt
    ? Math.max(0, Math.floor((clientNow - lastSyncedAt) / 1000))
    : null;
  const isStale =
    staleSeconds !== null &&
    clientNow - lastSyncedAt >= staleAfterMilliseconds;
  const competition = snapshot?.competition || {};
  const competitionStatus = competitionPresentation(competition, t);
  const queue = Array.isArray(snapshot?.queue) ? snapshot.queue : [];
  const liveAnnouncement = statusAnnouncement(snapshot, t);

  return (
    <div className="robotics-competition">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header
            changeLanguage={props.changeLanguage}
            current={props.current}
            isLoggedIn={props.isLoggedIn}
            language={props.language}
            logout={props.logout}
          />
          <div className="robotics-hero-copy">
            <span className="robotics-hero-kicker">{t("page.kicker")}</span>
            <div className="robotics-hero-title-row">
              <h1>
                {competition.name || t("page.competition")}
              </h1>
              {snapshot ? (
                <StatusChip
                  label={competitionStatus.label}
                  tone={competitionStatus.tone}
                />
              ) : null}
            </div>
          </div>
        </Grid>
      </div>

      <div aria-atomic="true" aria-live="polite" className="visually-hidden">
        {liveAnnouncement}
      </div>

      <Grid className="robotics-content">
        {snapshot ? (
          <>
            <div
              className={`robotics-freshness ${
                isStale || connectionError ? "robotics-freshness-stale" : ""
              }`}
            >
              <span>
                {isStale || connectionError ? (
                  <WifiOff aria-hidden="true" size={17} />
                ) : (
                  <span aria-hidden="true" className="robotics-live-dot" />
                )}
                {lastSyncedAt
                  ? t("page.updated", { seconds: staleSeconds })
                  : t("page.connecting")}
              </span>
              {connectionError ? (
                <span className="robotics-freshness-message">
                  {connectionError}
                </span>
              ) : null}
              <button
                aria-label={t("page.refreshAria")}
                disabled={isRefreshing}
                onClick={() => loadCompetition({ silent: false })}
                type="button"
              >
                <RefreshCw aria-hidden="true" size={17} />
                {isRefreshing ? t("page.refreshing") : t("page.refresh")}
              </button>
            </div>

            <LiveOverview
              nowMilliseconds={nowMilliseconds}
              snapshot={snapshot}
            />

            <TeamAccess
              actionError={actionError}
              actionNotice={actionNotice}
              authError={authError}
              onAction={performAction}
              onAuthenticate={authenticateTeam}
              onLogout={logoutTeam}
              pendingAction={pendingAction}
              pin={pin}
              setPin={setPin}
              snapshot={snapshot}
            />

            <div className="robotics-public-layout">
              <Queue queue={queue} />
              <TeamsTable
                nowMilliseconds={nowMilliseconds}
                snapshot={snapshot}
              />
            </div>
          </>
        ) : isLoading ? (
          <LoadingState />
        ) : (
          <PublicError
            message={pageError}
            onRetry={() => loadCompetition({ silent: false })}
          />
        )}
      </Grid>
    </div>
  );
}
