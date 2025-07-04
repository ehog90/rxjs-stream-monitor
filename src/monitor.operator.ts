import { Observable, OperatorFunction, PartialObserver } from 'rxjs';
import { StreamMonitor } from './stream-monitor';

/** @deprecated use signal version instead */
export function monitor<T>(streamMonitor: StreamMonitor): OperatorFunction<T, T> {
  return (source$: Observable<T>): Observable<T> =>
    new Observable<T>((observer) => {
      streamMonitor.isActive = true;
      streamMonitor.error = null;
      streamMonitor.pumps = 0;

      const wrapper: PartialObserver<T> = {
        next: (value: T) => {
          streamMonitor.pumps += 1;
          observer.next(value);
        },
        error: (error) => {
          streamMonitor.isActive = false;
          streamMonitor.error = error;
          observer.error(error);
        },
        complete: () => {
          streamMonitor.isActive = false;
          observer.complete();
        },
      };
      return source$.subscribe(wrapper);
    });
}
