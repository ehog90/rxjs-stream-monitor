export class StreamMonitor {
  public isActive = false;

  public pumps = 0;

  public error: unknown | null = null;
}

export function createMonitor(): StreamMonitor {
  return new StreamMonitor();
}
