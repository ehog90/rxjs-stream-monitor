export class StreamMonitor {
  public isActive: boolean = false;
  public pumps: number = 0;
  public error: any | null = null;
}

export function createMonitor() {
  return new StreamMonitor();
}
