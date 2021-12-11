module.exports = {
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.(tsx|ts|js|jsx)",
    "!src/**/*.(spec|test).(tsx|ts|js|jsx)",
    "!src/**/_(app|document|error).(tsx|ts|js|jsx)"
  ],
  coverageReporters: ["lcov", "json"],
  testEnvironment: "jsdom"
};