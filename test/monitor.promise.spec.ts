import { createMonitor } from "../src/stream-monitor";
import { monitorPromise } from "../src/monitor.promise";

describe("Promise handling", () => {
  it("should handle a simple Promise correctly", async () => {
    const streamMonitor = createMonitor();
    const promise = new Promise(resolve => resolve(420));
    const result = await monitorPromise(streamMonitor, promise);
    expect(result).toEqual(420);
  });

  it("should handle a simple Promise rejection correctly", async () => {
    const streamMonitor = createMonitor();
    const promise = new Promise((_, reject) => reject(420));
    await monitorPromise(streamMonitor, promise);
    expect(streamMonitor.isActive).toEqual(false);
    expect(streamMonitor.error).toEqual(420);
  });
});

