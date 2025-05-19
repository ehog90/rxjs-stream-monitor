import { signal, WritableSignal } from '@angular/core';

export type StreamMonitor = {
  isActive: boolean;
  pumps: number;
  error: unknown | null;
};

/** @deprecated use signal version instead */
export function createMonitor(): StreamMonitor {
  return { isActive: false, pumps: 0, error: null };
}

export function createMonitorSignal(): WritableSignal<StreamMonitor> {
  return signal({ isActive: false, pumps: 0, error: null });
}
