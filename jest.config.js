"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    },
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    moduleNameMapper: {
        // Handle path aliases if you have them
        "^@/(.*)$": "<rootDir>/$1",
    },
};
exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamVzdC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqZXN0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sTUFBTSxHQUFXO0lBQ3JCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLGVBQWUsRUFBRSxNQUFNO0lBQ3ZCLG9CQUFvQixFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQztJQUN4RCxTQUFTLEVBQUU7UUFDVCx3QkFBd0IsRUFBRSxZQUFZO0tBQ3ZDO0lBQ0QsU0FBUyxFQUFFLENBQUMsNkJBQTZCLEVBQUUsZ0NBQWdDLENBQUM7SUFDNUUsZ0JBQWdCLEVBQUU7UUFDaEIsdUNBQXVDO1FBQ3ZDLFVBQVUsRUFBRSxjQUFjO0tBQzNCO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ29uZmlnIH0gZnJvbSBcImplc3RcIjtcclxuXHJcbmNvbnN0IGNvbmZpZzogQ29uZmlnID0ge1xyXG4gIHByZXNldDogXCJ0cy1qZXN0XCIsXHJcbiAgdGVzdEVudmlyb25tZW50OiBcIm5vZGVcIixcclxuICBtb2R1bGVGaWxlRXh0ZW5zaW9uczogW1widHNcIiwgXCJ0c3hcIiwgXCJqc1wiLCBcImpzeFwiLCBcImpzb25cIl0sXHJcbiAgdHJhbnNmb3JtOiB7XHJcbiAgICBcIl4uK1xcXFwuKHRzfHRzeHxqc3xqc3gpJFwiOiBcImJhYmVsLWplc3RcIixcclxuICB9LFxyXG4gIHRlc3RNYXRjaDogW1wiKiovX190ZXN0c19fLyoqLyouW2p0XXM/KHgpXCIsIFwiKiovPygqLikrKHNwZWN8dGVzdCkuW3RqXXM/KHgpXCJdLFxyXG4gIG1vZHVsZU5hbWVNYXBwZXI6IHtcclxuICAgIC8vIEhhbmRsZSBwYXRoIGFsaWFzZXMgaWYgeW91IGhhdmUgdGhlbVxyXG4gICAgXCJeQC8oLiopJFwiOiBcIjxyb290RGlyPi8kMVwiLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XHJcbiJdfQ==