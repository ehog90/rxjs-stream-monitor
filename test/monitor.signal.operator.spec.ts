import { of, throwError, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { createMonitorSignal } from '../src/stream-monitor';
import { monitorSignal } from '../src/monitor.signal.operator';

describe('Monitor signal operator function', () => {
  it('should handle a simple Observable correctly', (done) => {
    const streamMonitor = createMonitorSignal();
    const observable = timer(50).pipe(take(1));
    expect.assertions(3);
    observable.pipe(monitorSignal(streamMonitor)).subscribe({
      next: () => {
        expect(streamMonitor().isActive).toBeTruthy();
        expect(streamMonitor().pumps).toBe(1);
      },
      complete: () => {
        expect(streamMonitor().isActive).toBeFalsy();
        done();
      },
    });
  });

  it('should handle a more complex Observable correctly', (done) => {
    const streamMonitor = createMonitorSignal();
    const observable = of(1, 2, 3, 4);
    observable.pipe(monitorSignal(streamMonitor)).subscribe({
      next: (value) => {
        expect(streamMonitor().isActive).toBeTruthy();
        expect(streamMonitor().pumps).toBe(value);
      },
      complete: () => {
        expect(streamMonitor().isActive).toBeFalsy();
        expect(streamMonitor().pumps).toBe(4);
        done();
      },
    });
  });

  it('should handle an error', (done) => {
    const streamMonitor = createMonitorSignal();
    const observable = throwError(() => 'This is an error');
    observable.pipe(monitorSignal(streamMonitor)).subscribe({
      error: () => {
        expect(streamMonitor().isActive).toBeFalsy();
        expect(streamMonitor().pumps).toBe(0);
        expect(streamMonitor().error).toEqual('This is an error');
        done();
      },
    });
  });
});
