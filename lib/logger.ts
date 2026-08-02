type LogPayload = Record<string, unknown>;

function write(level: "info" | "warn" | "error", message: string, payload: LogPayload = {}) {
  const entry = {
    level,
    message,
    service: "genericfinder-web",
    timestamp: new Date().toISOString(),
    ...payload
  };

  if (level === "error") console.error(JSON.stringify(entry));
  else if (level === "warn") console.warn(JSON.stringify(entry));
  else console.info(JSON.stringify(entry));
}

export const logger = {
  info: (message: string, payload?: LogPayload) => write("info", message, payload),
  warn: (message: string, payload?: LogPayload) => write("warn", message, payload),
  error: (message: string, payload?: LogPayload) => write("error", message, payload)
};
