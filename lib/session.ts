/**
 * Session returned when the user is logged in (from cookie).
 */
export type Session = {
  username: string;
  knockPattern: string;
};

/**
 * Fetches the current session from the cookie (GET /api/auth/session).
 * Use when you need username and knock pattern while logged in.
 */
export async function getSession(): Promise<Session | null> {
  const res = await fetch("/api/auth/session", { credentials: "include" });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.session ?? null;
}
