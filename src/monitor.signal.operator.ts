import { Observable, OperatorFunction, PartialObserver } from 'rxjs';
import { MonitorSignal } from './stream-monitor';

export function monitorSignal<T>(streamMonitor: MonitorSignal): OperatorFunction<T, T> {
  return (source$: Observable<T>): Observable<T> =>
    new Observable<T>((observer) => {
      streamMonitor.reset();
      const wrapper: PartialObserver<T> = {
        next: (value: T) => {
          streamMonitor.incrementPumps();
          observer.next(value);
        },
        error: (error) => {
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
