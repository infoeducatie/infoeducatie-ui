const storagePrefix = "infoeducatie:robotics-team:";

function storageKey(slug) {
  return `${storagePrefix}${slug}`;
}

export function getRoboticsTeamToken(slug) {
  try {
    return window.sessionStorage.getItem(storageKey(slug)) || "";
  } catch {
    return "";
  }
}

export function setRoboticsTeamToken(slug, token) {
  try {
    window.sessionStorage.setItem(storageKey(slug), token);
  } catch {
    // The live public view remains usable when session storage is unavailable.
  }
}

export function clearRoboticsTeamToken(slug) {
  try {
    window.sessionStorage.removeItem(storageKey(slug));
  } catch {
    // There is nothing else to clear when session storage is unavailable.
  }
}
