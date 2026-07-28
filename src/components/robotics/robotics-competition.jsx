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
  active: { label: "În desfășurare", tone: "active" },
  cancelled: { label: "Anulată", tone: "ended" },
  canceled: { label: "Anulată", tone: "ended" },
  completed: { label: "Încheiată", tone: "ended" },
  ended: { label: "Încheiată", tone: "ended" },
  live: { label: "În desfășurare", tone: "active" },
  paused: { label: "În pauză", tone: "paused" },
  running: { label: "În desfășurare", tone: "active" },
  scheduled: { label: "Programată", tone: "scheduled" },
  upcoming: { label: "Programată", tone: "scheduled" },
};

const arenaStatuses = {
  active: { label: "În testare", tone: "active" },
  available: { label: "Liberă", tone: "available" },
  claimable: { label: "Așteaptă confirmarea", tone: "offered" },
  closed: { label: "Închisă", tone: "ended" },
  cooldown: { label: "În pregătire", tone: "turnover" },
  idle: { label: "Liberă", tone: "available" },
  in_use: { label: "În testare", tone: "active" },
  offered: { label: "Așteaptă confirmarea", tone: "offered" },
  paused: { label: "Indisponibilă", tone: "paused" },
  reserved: { label: "Așteaptă confirmarea", tone: "offered" },
  scheduled: { label: "Programată", tone: "scheduled" },
  testing: { label: "În testare", tone: "active" },
  turnover: { label: "În pregătire", tone: "turnover" },
  unavailable: { label: "Indisponibilă", tone: "paused" },
};

const teamStatuses = {
  exhausted: { label: "Timp utilizat", tone: "ended" },
  inactive: { label: "Inactivă", tone: "neutral" },
};

function sameIdentifier(first, second) {
  return first !== null &&
    first !== undefined &&
    second !== null &&
    second !== undefined &&
    String(first) === String(second);
}

function competitionPresentation(competition = {}) {
  return competitionStatuses[competition.status] || {
    label: "Stare necunoscută",
    tone: "scheduled",
  };
}

function arenaPresentation(arena = {}) {
  return arenaStatuses[arena.status] || {
    label: "Se actualizează",
    tone: "turnover",
  };
}

function competitionClock(competition = {}, nowMilliseconds) {
  const startsAt = timestampMilliseconds(competition.starts_at);
  const endsAt = timestampMilliseconds(competition.ends_at);

  if (
    startsAt !== null &&
    startsAt > nowMilliseconds &&
    !["active", "live", "running"].includes(competition.status)
  ) {
    return {
      label: "Până la start",
      seconds: secondsUntil(competition.starts_at, nowMilliseconds),
    };
  }

  if (
    ["cancelled", "canceled", "completed", "ended"].includes(
      competition.status,
    ) ||
    (endsAt !== null && endsAt <= nowMilliseconds)
  ) {
    return { label: "Competiție încheiată", seconds: 0 };
  }

  return {
    label: "Timp rămas",
    seconds: secondsUntil(competition.ends_at, nowMilliseconds),
  };
}

function arenaClock(arena = {}, nowMilliseconds) {
  if (arena.status === "active" && arena.session_ends_at) {
    return {
      label: "Tura se încheie în",
      seconds: secondsUntil(arena.session_ends_at, nowMilliseconds),
    };
  }

  if (arena.status === "offered" && arena.offer_expires_at) {
    return {
      label: "Confirmare în",
      seconds: secondsUntil(arena.offer_expires_at, nowMilliseconds),
    };
  }

  if (
    ["scheduled", "turnover"].includes(arena.status) &&
    arena.available_at
  ) {
    return {
      label: "Disponibilă în",
      seconds: secondsUntil(arena.available_at, nowMilliseconds),
    };
  }

  if (arena.status === "available") {
    return { label: "Disponibilă acum", seconds: 0 };
  }

  if (arena.status === "closed") {
    return { label: "Competiție încheiată", seconds: 0 };
  }

  return { label: "Fără tură activă", seconds: null };
}

function arenaDescription(arena = {}) {
  const presentation = arenaPresentation(arena);

  if (presentation.tone === "active") {
    return "Doar această echipă poate folosi acum mediul de testare.";
  }

  if (presentation.tone === "offered") {
    return "Echipa trebuie să confirme tura înainte să expire rezervarea.";
  }

  if (presentation.tone === "available") {
    return "Mediul este liber și următoarea echipă se poate pregăti.";
  }

  if (presentation.tone === "turnover") {
    return "Organizatorii pregătesc mediul pentru următoarea tură.";
  }

  return "Mediul de testare nu poate fi preluat momentan.";
}

function teamPresentation(team, snapshot, nowMilliseconds) {
  const arena = snapshot.arena || {};
  const queue = Array.isArray(snapshot.queue) ? snapshot.queue : [];
  const queueEntry = queue.find((entry) =>
    sameIdentifier(entry.team_id, team.id),
  );
  const queuePosition = team.queue_position || queueEntry?.position;
  const cooldown = secondsUntil(team.cooldown_until, nowMilliseconds);

  if (sameIdentifier(arena.team_id, team.id)) {
    const currentArena = arenaPresentation(arena);
    return {
      label:
        currentArena.tone === "offered"
          ? "Trebuie să confirme"
          : currentArena.label,
      tone: currentArena.tone,
    };
  }

  if (queuePosition) {
    return {
      label: `În coadă, poziția ${queuePosition}`,
      tone: "queued",
    };
  }

  if (cooldown !== null && cooldown > 0) {
    return {
      label: `Pauză ${formatCountdown(cooldown)}`,
      tone: "turnover",
    };
  }

  if (Number(team.remaining_seconds) <= 0) {
    return { label: "Timp utilizat", tone: "ended" };
  }

  if (teamStatuses[team.status]) {
    return teamStatuses[team.status];
  }

  if (team.ready) {
    return { label: "Pregătită", tone: "available" };
  }

  const knownStatus = arenaStatuses[team.status];
  if (knownStatus) {
    return knownStatus;
  }

  return { label: "Disponibilă", tone: "neutral" };
}

function statusAnnouncement(snapshot) {
  if (!snapshot) {
    return "";
  }

  const competition = competitionPresentation(snapshot.competition);
  const arena = arenaPresentation(snapshot.arena);
  const teamName = snapshot.arena?.team_name;
  const teamMessage = teamName ? `, echipa ${teamName}` : "";

  return `Competiție ${competition.label.toLowerCase()}. Arena ${
    arena.label
  }${teamMessage}.`;
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
  const competition = snapshot.competition || {};
  const arena = snapshot.arena || {};
  const currentCompetitionClock = competitionClock(
    competition,
    nowMilliseconds,
  );
  const currentArenaClock = arenaClock(arena, nowMilliseconds);
  const currentArena = arenaPresentation(arena);
  const turnDuration = formatDuration(competition.turn_duration_seconds);

  return (
    <>
      <section
        aria-label="Cronometrele competiției"
        className="robotics-clock-strip"
      >
        <div className="robotics-clock-period">
          <span className="robotics-clock-label">Program</span>
          <strong>{formatDateTime(competition.starts_at)}</strong>
          <span>până la {formatDateTime(competition.ends_at)}</span>
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
              {arena.team_name || "Mediul de testare este liber"}
            </h2>
            <p>{arenaDescription(arena)}</p>
          </div>
        </div>
        <div className="robotics-arena-rule">
          <Clock aria-hidden="true" size={20} />
          <span>
            Ture de <strong>{turnDuration}</strong>. O singură echipă testează
            la un moment dat.
          </span>
        </div>
      </section>
    </>
  );
}

function LoadingState() {
  return (
    <section
      aria-busy="true"
      className="robotics-loading"
      role="status"
    >
      <span className="visually-hidden">
        Se încarcă starea competiției.
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
  return (
    <section className="robotics-page-error" role="alert">
      <WifiOff aria-hidden="true" size={32} />
      <div>
        <h2>Datele live nu sunt disponibile</h2>
        <p>{message}</p>
      </div>
      <button
        className="robotics-button robotics-button-primary"
        onClick={onRetry}
        type="button"
      >
        <RefreshCw aria-hidden="true" size={18} />
        Reîncearcă
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
            <h2 id="robotics-team-access-title">Acces pentru echipe</h2>
            <p>
              Introdu PIN-ul primit de la organizatori pentru a intra în coadă
              sau a controla tura echipei tale.
            </p>
          </div>
        </div>
        <form className="robotics-pin-form" onSubmit={onAuthenticate}>
          <div className="robotics-pin-field">
            <label htmlFor="robotics-team-pin">PIN echipă</label>
            <input
              aria-describedby={
                authError ? "robotics-auth-error" : "robotics-pin-help"
              }
              autoComplete="one-time-code"
              id="robotics-team-pin"
              inputMode="numeric"
              maxLength="24"
              onChange={(event) => setPin(event.currentTarget.value)}
              placeholder="Introdu PIN-ul"
              required
              type="password"
              value={pin}
            />
            <span id="robotics-pin-help">
              PIN-ul rămâne doar în acest formular.
            </span>
          </div>
          <button
            className="robotics-button robotics-button-primary"
            disabled={pendingAction === "authenticate"}
            type="submit"
          >
            <LogIn aria-hidden="true" size={18} />
            {pendingAction === "authenticate" ? "Se verifică…" : "Intră"}
          </button>
        </form>
        {authError ? (
          <p className="robotics-inline-error" id="robotics-auth-error" role="alert">
            {authError}
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
          <span>Sesiune de echipă activă</span>
          <h2 id="robotics-team-controls-title">
            {viewerTeam?.name || "Echipa ta"}
          </h2>
          <p>
            {viewerTeam
              ? `${formatDuration(
                  viewerTeam.remaining_seconds,
                )} rămase din ${formatDuration(
                  viewerTeam.allocated_seconds,
                )}.`
              : "Poți controla doar accesul echipei tale."}
          </p>
        </div>
      </div>

      <div className="robotics-team-actions" aria-label="Acțiuni echipă">
        {capabilities.claim ? (
          <button
            className="robotics-button robotics-button-primary"
            disabled={Boolean(pendingAction)}
            onClick={() => onAction("claim")}
            type="button"
          >
            <Play aria-hidden="true" size={18} />
            {pendingAction === "claim" ? "Se pornește…" : "Începe tura"}
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
            {pendingAction === "stop" ? "Se oprește…" : "Oprește testarea"}
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
            {pendingAction === "join" ? "Se adaugă…" : "Intră în coadă"}
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
            {pendingAction === "leave" ? "Se retrage…" : "Ieși din coadă"}
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
            {pendingAction === "pass" ? "Se cedează…" : "Cedează tura"}
          </button>
        ) : null}
        <button
          className="robotics-button robotics-button-quiet"
          disabled={Boolean(pendingAction)}
          onClick={onLogout}
          type="button"
        >
          <LogOut aria-hidden="true" size={18} />
          Ieși din sesiune
        </button>
      </div>

      {!hasPrimaryAction ? (
        <p className="robotics-team-waiting">
          Nu ai nicio acțiune disponibilă momentan. Starea se actualizează
          automat.
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
  const sortedQueue = [...queue].sort(
    (first, second) => Number(first.position) - Number(second.position),
  );

  return (
    <section aria-labelledby="robotics-queue-title" className="robotics-queue">
      <div className="robotics-section-heading">
        <div>
          <span className="robotics-eyebrow">Ordine live</span>
          <h2 id="robotics-queue-title">Coada de testare</h2>
        </div>
        <span className="robotics-queue-count">
          {sortedQueue.length}{" "}
          {sortedQueue.length === 1 ? "echipă" : "echipe"}
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
                <small>Pregătită pentru următoarea tură</small>
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <div className="robotics-empty-state">
          <DoorOpen aria-hidden="true" size={28} />
          <p>
            Coada este liberă. O echipă autentificată poate solicita următoarea
            tură.
          </p>
        </div>
      )}
    </section>
  );
}

function TeamsTable({ nowMilliseconds, snapshot }) {
  const teams = Array.isArray(snapshot.teams) ? snapshot.teams : [];
  const sortedTeams = [...teams].sort(
    (first, second) => Number(first.position) - Number(second.position),
  );

  return (
    <section aria-labelledby="robotics-teams-title" className="robotics-teams">
      <div className="robotics-section-heading">
        <div>
          <span className="robotics-eyebrow">Timp egal, stare publică</span>
          <h2 id="robotics-teams-title">Toate echipele</h2>
        </div>
      </div>

      {sortedTeams.length ? (
        <div className="robotics-team-table-wrap">
          <table className="robotics-team-table">
            <caption className="visually-hidden">
              Timpul folosit, timpul rămas și starea fiecărei echipe
            </caption>
            <thead>
              <tr>
                <th scope="col">Echipă</th>
                <th scope="col">Stare</th>
                <th scope="col">Timp folosit</th>
                <th scope="col">Timp rămas</th>
                <th scope="col">Ture</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team) => {
                const status = teamPresentation(
                  team,
                  snapshot,
                  nowMilliseconds,
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
                    <th data-label="Echipă" scope="row">
                      <strong>{team.name}</strong>
                    </th>
                    <td data-label="Stare">
                      <StatusChip label={status.label} tone={status.tone} />
                    </td>
                    <td data-label="Timp folosit">
                      <div className="robotics-team-progress">
                        <progress
                          aria-label={`${team.name}: ${Math.round(
                            percentage,
                          )}% din timpul alocat a fost folosit`}
                          max="100"
                          value={percentage}
                        />
                        <span>{formatDuration(team.used_seconds)}</span>
                      </div>
                    </td>
                    <td data-label="Timp rămas">
                      <strong>{formatDuration(team.remaining_seconds)}</strong>
                    </td>
                    <td data-label="Ture">
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
          <p>Echipele nu au fost adăugate încă.</p>
        </div>
      )}
    </section>
  );
}

export default function RoboticsCompetition(props) {
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
      throw new Error("Serverul nu a trimis starea completă a competiției.");
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
  }, []);

  const expireTeamSession = useCallback(
    (message = "Sesiunea echipei a expirat. Introdu din nou PIN-ul.") => {
      clearRoboticsTeamToken(slug);
      setTeamTokenState("");
      setSnapshot((currentSnapshot) =>
        currentSnapshot
          ? { ...currentSnapshot, viewer: null }
          : currentSnapshot,
      );
      setActionNotice(message);
    },
    [slug],
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
      : "Competiție de robotică | InfoEducație";
  }, [snapshot?.competition?.name]);

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
        claim: "Tura a început. Cronometrul este activ.",
        join: "Echipa a intrat în coada de testare.",
        leave: "Echipa a ieșit din coada de testare.",
        pass: "Tura a fost cedată, iar timpul nefolosit rămâne echipei.",
        stop: "Testarea s-a oprit, iar mediul a fost eliberat.",
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
            `${requestError.message} Datele sunt actualizate acum.`,
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
    ],
  );

  const authenticateTeam = useCallback(
    async (event) => {
      event.preventDefault();
      const normalizedPin = pin.trim();

      if (!normalizedPin) {
        setAuthError("Introdu PIN-ul echipei.");
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
            "Serverul nu a putut deschide sesiunea echipei. Încearcă din nou.",
          );
        }

        setRoboticsTeamToken(slug, response.token);
        setTeamTokenState(response.token);
        applySnapshot(response.state, sequence);
        setPin("");
        setActionNotice("Echipa a fost autentificată.");
      } catch (requestError) {
        setAuthError(
          requestError.status === 401 || requestError.status === 422
            ? "PIN-ul nu este valid. Verifică-l și încearcă din nou."
            : requestError.message,
        );
      } finally {
        setPendingAction("");
      }
    },
    [applySnapshot, pin, slug],
  );

  const logoutTeam = useCallback(() => {
    clearRoboticsTeamToken(slug);
    setTeamTokenState("");
    setActionError("");
    setActionNotice("Ai ieșit din sesiunea echipei.");
    setSnapshot((currentSnapshot) =>
      currentSnapshot
        ? { ...currentSnapshot, viewer: null }
        : currentSnapshot,
    );
  }, [slug]);

  const nowMilliseconds = clientNow + clockOffset;
  const staleSeconds = lastSyncedAt
    ? Math.max(0, Math.floor((clientNow - lastSyncedAt) / 1000))
    : null;
  const isStale =
    staleSeconds !== null &&
    clientNow - lastSyncedAt >= staleAfterMilliseconds;
  const competition = snapshot?.competition || {};
  const competitionStatus = competitionPresentation(competition);
  const queue = Array.isArray(snapshot?.queue) ? snapshot.queue : [];
  const liveAnnouncement = statusAnnouncement(snapshot);

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
            <span className="robotics-hero-kicker">Zonă de testare drone</span>
            <div className="robotics-hero-title-row">
              <h1>
                {competition.name || "Competiție de robotică"}
              </h1>
              {snapshot ? (
                <StatusChip
                  label={competitionStatus.label}
                  tone={competitionStatus.tone}
                />
              ) : null}
            </div>
            <p>
              Un singur mediu de testare, acces echitabil pentru fiecare
              echipă și o stare live vizibilă tuturor.
            </p>
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
                  ? `Actualizat acum ${staleSeconds} sec`
                  : "Se conectează la datele live"}
              </span>
              {connectionError ? (
                <span className="robotics-freshness-message">
                  {connectionError}
                </span>
              ) : null}
              <button
                aria-label="Actualizează acum datele competiției"
                disabled={isRefreshing}
                onClick={() => loadCompetition({ silent: false })}
                type="button"
              >
                <RefreshCw aria-hidden="true" size={17} />
                {isRefreshing ? "Se actualizează…" : "Actualizează"}
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
