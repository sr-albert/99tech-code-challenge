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

// Pre-load ALL source files as raw text at build time
// This glob pattern must match all TS/TSX files in your project
const rawModules = import.meta.glob(
  ['./**/*.ts', './**/*.tsx', '../**/*.ts', '../**/*.tsx'], 
  { as: 'raw', eager: true }
);

export async function loadSourceText(sourceUrl: string): Promise<string> {
  // Normalize the URL (remove query params and leading ./)
  const normalizedUrl = sourceUrl.replace(/\?.*$/, '').replace(/^\.\//, '');
  
  // Find matching file from pre-loaded modules
  for (const [key, content] of Object.entries(rawModules)) {
    // Check if the key ends with our target filename
    // Handles cases like "./problem1/solution.ts" matching "solution.ts"
    if (key.endsWith('/' + normalizedUrl) || key.replace(/^\.\//, '') === normalizedUrl) {
      return content;
    }
  }
  
  throw new Error(
    `Could not load source text for "${sourceUrl}". ` +
    `Available files: ${Object.keys(rawModules).join(', ')}`
  );
}

// Remove manual registry - Vite handles dynamic imports automatically
async function importModule(moduleUrl: string): Promise<unknown> {
  return import(moduleUrl);
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
 
    await importModule(moduleUrl);
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