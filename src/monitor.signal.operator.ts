import { Observable, OperatorFunction, PartialObserver } from 'rxjs';
import { MonitorSignal } from './stream-monitor';

export function monitorSignal<T>(streamMonitor: MonitorSignal): OperatorFunction<T, T> {
  return (source$: Observable<T>): Observable<T> =>
    new Observable<T>((observer) => {
      streamMonitor.reset();
      streamMonitor.setActive();
      const wrapper: PartialObserver<T> = {
        next: (value: T) => {
          streamMonitor.incrementPumps();
          observer.next(value);
        },
        error: (error) => {
          streamMonitor.setInactive();
          streamMonitor.setError(error);
          observer.error(error);
        },
        complete: () => {
          streamMonitor.setInactive();
          observer.complete();
        },
      };
      return source$.subscribe(wrapper);
    });
}
