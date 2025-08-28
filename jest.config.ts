import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node", // Use "jsdom" for React component tests
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  // REMOVE the transform block below! ts-jest will handle it.
  // transform: {
  //   "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  // },
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
export default config;