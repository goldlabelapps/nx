export const PUBLIC_ROUTE_PATTERNS: RegExp[] = [
  /^\/$/,
  /^\/how-to(?:\/.*)?$/,
  /^\/videos(?:\/.*)?$/,
  /^\/articles(?:\/.*)?$/,
  /^\/create-account(?:\/.*)?$/,
  /^\/sign-in(?:\/.*)?$/,
  /^\/login(?:\/.*)?$/,
  /^\/forgot-password(?:\/.*)?$/,
  /^\/reset-password(?:\/.*)?$/,
  /^\/api\/auth\/.*/,
  /^\/favicon\.ico$/,
  /^\/manifest\.webmanifest$/,
  /^\/png\/.*$/,
  /^\/svg\/.*$/,
  /^\/public\/.*$/,
];

export function isPublicPath(pathname: string): boolean {
  if (!pathname) return true;
  return PUBLIC_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname));
}

export function getRouteZone(pathname: string): "public" | "authenticated" {
  return isPublicPath(pathname) ? "public" : "authenticated";
}
