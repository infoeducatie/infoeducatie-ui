const romanianDateTime = new Intl.DateTimeFormat("ro-RO", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function timestampMilliseconds(timestamp) {
  const milliseconds = Date.parse(timestamp);
  return Number.isFinite(milliseconds) ? milliseconds : null;
}

export function secondsUntil(timestamp, nowMilliseconds) {
  const deadline = timestampMilliseconds(timestamp);

  if (deadline === null) {
    return null;
  }

  return Math.max(0, Math.ceil((deadline - nowMilliseconds) / 1000));
}

export function formatCountdown(value) {
  const totalSeconds = Math.max(0, Math.floor(Number(value) || 0));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

export function formatDuration(value) {
  const totalSeconds = Math.max(0, Math.round(Number(value) || 0));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours) {
    return `${hours} h ${String(minutes).padStart(2, "0")} min${
      seconds ? ` ${String(seconds).padStart(2, "0")} sec` : ""
    }`;
  }

  if (minutes) {
    return `${minutes} min${seconds ? ` ${seconds} sec` : ""}`;
  }

  return `${seconds} sec`;
}

export function formatDateTime(timestamp) {
  const milliseconds = timestampMilliseconds(timestamp);

  if (milliseconds === null) {
    return "Ora nu este stabilită";
  }

  return romanianDateTime.format(new Date(milliseconds));
}

export function boundedPercentage(value, total) {
  const normalizedTotal = Number(total) || 0;

  if (normalizedTotal <= 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, (Number(value) / normalizedTotal) * 100));
}
