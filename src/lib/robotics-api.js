import i18n from "./i18n";

export class RoboticsApiError extends Error {
  constructor(message, { code = "request_failed", status = 0 } = {}) {
    super(message);
    this.name = "RoboticsApiError";
    this.code = code;
    this.status = status;
  }
}

function competitionUrl(slug, action = "") {
  const encodedSlug = encodeURIComponent(slug);
  const suffix = action ? `/${action}` : "";
  return `${window.config.API_URL}robotics/competitions/${encodedSlug}${suffix}`;
}

function errorDetails(payload, response) {
  const apiError = payload && payload.error;

  if (apiError && typeof apiError === "object") {
    return {
      code: apiError.code || "request_failed",
      message: apiError.message || i18n.t("robotics:errors.request"),
    };
  }

  if (typeof apiError === "string") {
    return { code: "request_failed", message: apiError };
  }

  if (response.status === 404) {
    return {
      code: "not_found",
      message: i18n.t("robotics:errors.notFound"),
    };
  }

  if (response.status === 409) {
    return {
      code: "state_conflict",
      message: i18n.t("robotics:errors.conflict"),
    };
  }

  return {
    code: "request_failed",
    message: i18n.t("robotics:errors.communication"),
  };
}

async function roboticsRequest({
  action,
  data,
  method = "GET",
  signal,
  slug,
  token,
}) {
  const headers = new Headers({ Accept: "application/json" });

  if (token) {
    headers.set("Authorization", `Team ${token}`);
  }

  const options = {
    cache: "no-store",
    headers,
    method,
    signal,
  };

  if (data !== undefined) {
    headers.set("Content-Type", "application/json");
    options.body = JSON.stringify(data);
  }

  let response;

  try {
    response = await fetch(competitionUrl(slug, action), options);
  } catch (requestError) {
    if (requestError.name === "AbortError") {
      throw requestError;
    }

    throw new RoboticsApiError(
      i18n.t("robotics:errors.network"),
      { code: "network_error" },
    );
  }

  const responseText = await response.text();
  let payload = null;

  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch {
      throw new RoboticsApiError(
        i18n.t("robotics:errors.invalidResponse"),
        { code: "invalid_response", status: response.status },
      );
    }
  }

  if (!response.ok) {
    const details = errorDetails(payload, response);
    throw new RoboticsApiError(details.message, {
      code: details.code,
      status: response.status,
    });
  }

  return payload;
}

export function getRoboticsCompetition(slug, { signal, token } = {}) {
  return roboticsRequest({ signal, slug, token });
}

export function authenticateRoboticsTeam(slug, pin, { signal } = {}) {
  return roboticsRequest({
    action: "authenticate",
    data: { pin },
    method: "POST",
    signal,
    slug,
  });
}

export function setRoboticsReadiness(
  slug,
  ready,
  { signal, token } = {},
) {
  return roboticsRequest({
    action: "readiness",
    data: { ready },
    method: "PUT",
    signal,
    slug,
    token,
  });
}

export function claimRoboticsTurn(
  slug,
  { signal, token, turnId } = {},
) {
  return roboticsRequest({
    action: "claim",
    data: { turn_id: turnId },
    method: "POST",
    signal,
    slug,
    token,
  });
}

export function passRoboticsTurn(
  slug,
  { signal, token, turnId } = {},
) {
  return roboticsRequest({
    action: "pass",
    data: { turn_id: turnId },
    method: "POST",
    signal,
    slug,
    token,
  });
}

export function stopRoboticsTurn(
  slug,
  { signal, token, turnId } = {},
) {
  return roboticsRequest({
    action: "stop",
    data: { turn_id: turnId },
    method: "POST",
    signal,
    slug,
    token,
  });
}
