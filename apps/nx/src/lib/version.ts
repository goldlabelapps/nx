import packageJson from "../../package.json";

// Single source of truth for the version pill shown next to the brand logo.
export const appVersion: string = packageJson.version;
