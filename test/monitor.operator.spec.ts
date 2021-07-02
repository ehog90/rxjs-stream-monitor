import { of, throwError, timer } from "rxjs";
import { createMonitor } from "../src/stream-monitor";
import { monitor } from "../src/monitor.operator";
import { take } from "rxjs/operators";

describe("Monitor operator function", () => {
  it("should handle a simple Observable correctly", (done) => {
    const streamMonitor = createMonitor();
    const observable = timer(50).pipe(take(1));
    expect.assertions(3);
    observable.pipe(monitor(streamMonitor)).subscribe({
      next: () => {
        expect(streamMonitor.isActive).toBeTruthy();
        expect(streamMonitor.pumps).toBe(1);
      },
      complete: () => {
        expect(streamMonitor.isActive).toBeFalsy();
        done();
      },
    });
  });

  it("should handle a more complex Observable correctly", (done) => {
    const streamMonitor = createMonitor();
    const observable = of(1, 2, 3, 4);
    observable.pipe(monitor(streamMonitor)).subscribe({
      next: (value) => {
        expect(streamMonitor.isActive).toBeTruthy();
        expect(streamMonitor.pumps).toBe(value);
      },
      complete: () => {
        expect(streamMonitor.isActive).toBeFalsy();
        expect(streamMonitor.pumps).toBe(4);
        done();
      },
    });
  });

  it("should handle an error", (done) => {
    const streamMonitor = createMonitor();
    const observable = throwError(() => "This is an error");
    observable.pipe(monitor(streamMonitor)).subscribe({
        complete: () => {
        },
        error: () => {
            expect(streamMonitor.isActive).toBeFalsy();
            expect(streamMonitor.pumps).toBe(0);
            expect(streamMonitor.error).toEqual("This is an error");
            done();
        }
      });
  });
});
