import { Signal, WritableSignal, signal } from '@angular/core';

export interface MonitorSignal extends Signal<StreamMonitor> {
  decrementPumps(): void;
  incrementPumps(): void;
  reset(): void;
  resetError(): void;
  setActive(): void;
  setError(error: unknown | null): void;
  setInactive(): void;
  setPumps(pumps: number): void;
}

export type StreamMonitor = {
  error: unknown | null;
  isActive: boolean;
  pumps: number;
};

/** @deprecated use signal version instead */
export function createMonitor(): StreamMonitor {
  return { isActive: false, pumps: 0, error: null };
}

export function createMonitorSignal(): MonitorSignal {
  const initialSignal = signal({
    isActive: false,
    pumps: 0,
    error: null,
  }) as unknown as WritableSignal<StreamMonitor> & MonitorSignal;
  initialSignal.setActive = () => {
    initialSignal.update((streamMonitor) => ({ ...streamMonitor, isActive: true }));
  };
  initialSignal.setInactive = () => {
    initialSignal.update((streamMonitor) => ({ ...streamMonitor, isActive: false }));
  };
  initialSignal.setError = (error: unknown | null) => {
    initialSignal.update((streamMonitor) => ({ ...streamMonitor, error }));
  };
  initialSignal.resetError = () => {
    initialSignal.update((streamMonitor) => ({ ...streamMonitor, error: null }));
  };
  initialSignal.incrementPumps = () => {
    initialSignal.update((streamMonitor) => ({ ...streamMonitor, pumps: streamMonitor.pumps + 1 }));
  };
  initialSignal.decrementPumps = () => {
    initialSignal.update((streamMonitor) => ({
      ...streamMonitor,
      pumps: Math.max(streamMonitor.pumps - 1, 0),
    }));
  };
  initialSignal.setPumps = (pumps: number) => {
    initialSignal.update((streamMonitor) => ({ ...streamMonitor, pumps }));
  };
  initialSignal.reset = () => {
    initialSignal.set({ isActive: false, pumps: 0, error: null });
  };
  return initialSignal;
}
