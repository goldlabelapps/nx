/**
 * Utility functions for superuser (God user) identification and authorization checks.
 */

/**
 * Checks if a given user ID, user object, or auth object matches the configured God User ID (process.env.NEXT_PUBLIC_GOD).
 *
 * @param userOrUid - A UID string or an object containing a `uid` property (e.g. Firebase User or auth payload).
 * @returns `true` if the UID matches process.env.NEXT_PUBLIC_GOD; `false` otherwise.
 */
export function isGod(userOrUid?: string | { uid?: string } | null): boolean {
  const godId = process.env.NEXT_PUBLIC_GOD?.trim();
  if (!godId) return false;

  if (typeof userOrUid === "string") {
    return userOrUid.trim() === godId;
  }

  if (userOrUid && typeof userOrUid === "object" && typeof userOrUid.uid === "string") {
    return userOrUid.uid.trim() === godId;
  }

  return false;
}
