"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import type { Config } from "jest";
const jest_js_1 = __importDefault(require("next/jest.js"));
const createJestConfig = (0, jest_js_1.default)({
    dir: "./",
});
const config = {
    coverageProvider: "v8",
    testEnvironment: "jsdom",
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
exports.default = createJestConfig(config);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamVzdC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqZXN0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNDQUFzQztBQUN0QywyREFBb0M7QUFFcEMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLGlCQUFRLEVBQUM7SUFDaEMsR0FBRyxFQUFFLElBQUk7Q0FDVixDQUFDLENBQUM7QUFHSCxNQUFNLE1BQU0sR0FBRztJQUNiLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsZUFBZSxFQUFFLE9BQU87SUFDeEIsbURBQW1EO0NBQ3BELENBQUM7QUFFRixrQkFBZSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB0eXBlIHsgQ29uZmlnIH0gZnJvbSBcImplc3RcIjtcclxuaW1wb3J0IG5leHRKZXN0IGZyb20gXCJuZXh0L2plc3QuanNcIjtcclxuXHJcbmNvbnN0IGNyZWF0ZUplc3RDb25maWcgPSBuZXh0SmVzdCh7XHJcbiAgZGlyOiBcIi4vXCIsXHJcbn0pO1xyXG5cclxuXHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuICBjb3ZlcmFnZVByb3ZpZGVyOiBcInY4XCIsXHJcbiAgdGVzdEVudmlyb25tZW50OiBcImpzZG9tXCIsXHJcbiAgLy8gc2V0dXBGaWxlc0FmdGVyRW52OiBbJzxyb290RGlyPi9qZXN0LnNldHVwLnRzJ10sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVKZXN0Q29uZmlnKGNvbmZpZyk7Il19