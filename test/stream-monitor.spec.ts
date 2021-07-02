import {createMonitor} from "../src/stream-monitor"

describe("Create monitor function", () => {
    it("should create an empty monitor correctly", () => {
        const monitor = createMonitor();
        expect(monitor.error).toBeNull();
        expect(monitor.isActive).toBe(false);
        expect(monitor.pumps).toBe(0);
    });
});

