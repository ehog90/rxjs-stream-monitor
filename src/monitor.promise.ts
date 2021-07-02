import { StreamMonitor } from './stream-monitor';

export async function monitorPromise<T>(
  monitor: StreamMonitor,
  promise: Promise<T>,
): Promise<T | null> {
  try {
    monitor.isActive = true;
    const result = await promise;
    monitor.isActive = false;
    return result;
  } catch (error) {
    monitor.isActive = false;
    monitor.error = error;
    return null;
  }
}
