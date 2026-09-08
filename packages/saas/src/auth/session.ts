export const SESSION_COOKIE_NAME = "__session";

export function getSessionCookie(cookies: { get: (name: string) => { value?: string } | undefined }): string | null {
  const cookie = cookies.get(SESSION_COOKIE_NAME);
  return cookie?.value || null;
}
