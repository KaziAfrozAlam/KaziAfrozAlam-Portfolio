interface DenoEnv {
  get(key: string): string | undefined;
  set?(key: string, value: string): void;
  toObject?(): Record<string, string>;
}

type DenoServeHandler = (req: Request) => Response | Promise<Response>;

interface DenoGlobal {
  env: DenoEnv;
  serve(handler: DenoServeHandler): void;
  cron?: unknown;
}

declare const Deno: DenoGlobal;
