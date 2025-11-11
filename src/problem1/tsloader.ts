export type ConsoleLine = string;

type RunOptions = {
  mirrorToDevtools?: boolean;
};

function stringifyArgs(args: unknown[]): string {
  try {
    return args
      .map((arg) => {
        if (typeof arg === "string") return arg;
        if (typeof arg === "number" || typeof arg === "boolean") return String(arg);
        if (arg === null) return "null";
        if (arg === undefined) return "undefined";
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      })
      .join(" ");
  } catch {
    return String(args[0]);
  }
}

export async function loadSourceText(sourceUrl: string): Promise<string> {
  const res = await fetch(sourceUrl, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

export async function runModuleAndCaptureLogs(
  moduleUrl: string,
  options: RunOptions = {}
): Promise<ConsoleLine[]> {
  const { mirrorToDevtools = true } = options;
  const captured: ConsoleLine[] = [];
  const timers = new Map<string, number>();

  const original = {
    log: console.log,
    time: console.time,
    timeEnd: console.timeEnd,
  };

  try {
    console.log = (...args: unknown[]) => {
      const line = stringifyArgs(args);
      captured.push(line);
      if (mirrorToDevtools) original.log(...args);
    };
    console.time = (label: string = "default") => {
      timers.set(label, performance.now());
    };
    console.timeEnd = (label: string = "default") => {
      const start = timers.get(label);
      if (typeof start === "number") {
        const ms = performance.now() - start;
        const line = `${label}: ${ms.toFixed(3)}ms`;
        captured.push(line);
        timers.delete(label);
      }
      if (mirrorToDevtools) {
        try {
          original.timeEnd(label);
        } catch {
          // ignore if label not started in original console
        }
      }
    };

    // Let Vite handle TS/TSX transpilation on import
    // Vite will automatically transpile .ts and .tsx files
    await import(moduleUrl);
  } catch (err) {
    captured.push("Failed to execute module");
    captured.push(err instanceof Error ? err.message : String(err));
  } finally {
    console.log = original.log;
    console.time = original.time;
    console.timeEnd = original.timeEnd;
  }
  return captured;
}


