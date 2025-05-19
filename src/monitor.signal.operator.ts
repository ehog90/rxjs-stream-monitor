import { WritableSignal } from '@angular/core';
import { Observable, OperatorFunction, PartialObserver } from 'rxjs';
import { StreamMonitor } from './stream-monitor';


export function monitorSignal<T>(
  streamMonitor: WritableSignal<StreamMonitor>,
): OperatorFunction<T, T> {
  return (source$: Observable<T>): Observable<T> =>
    new Observable<T>((observer) => {
      streamMonitor.set({ isActive: true, error: null, pumps: 0 });

      const wrapper: PartialObserver<T> = {
        next: (value: T) => {
          streamMonitor.update((monitor) => ({ ...monitor, pumps: monitor.pumps + 1 }));
          observer.next(value);
        },
        error: (error) => {
          streamMonitor.update((monitor) => ({ ...monitor, isActive: false, error }));
          observer.error(error);
        },
        complete: () => {
          streamMonitor.update((monitor) => ({ ...monitor, isActive: false }));
          observer.complete();
        },
      };
      return source$.subscribe(wrapper);
    });
}
