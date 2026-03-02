// Token storage utilities
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const TOKEN_EXPIRY_KEY = 'tokenExpiry';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export function saveTokens(tokens: AuthTokens): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  // Calculate expiry time in milliseconds
  const expiryTime = Date.now() + tokens.expiresIn * 1000;
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function isTokenExpired(): boolean {
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiry) return true;
  return Date.now() > parseInt(expiry);
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
}

export function isAuthenticated(): boolean {
  const token = getAccessToken();
  return !!token && !isTokenExpired();
}

/**
 * Attempt to read a human-friendly name from the access token payload.
 * The JWT returned by the API currently contains either a `name` or
 * `email` claim so we pick the first one we find.  Returns `null` if the
 * token is missing or cannot be parsed.
 */
export function getUserName(): string | null {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.name || payload?.email || null;
  } catch (err) {
    console.error('getUserName parse error', err);
    return null;
  }
}

/**
 * Read stored expiry timestamp (ms) or null if missing
 */
export function getTokenExpiry(): number | null {
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  return expiry ? parseInt(expiry) : null;
}

/**
 * Check if token will expire within the given threshold (seconds).
 * Defaults to one minute.
 */
export function willExpireSoon(thresholdSeconds = 60): boolean {
  const expiry = getTokenExpiry();
  if (!expiry) return true;
  return Date.now() + thresholdSeconds * 1000 >= expiry;
}

/**
 * Attempt to refresh tokens using the refresh endpoint.  Returns true on success.
 * Clears stored tokens on failure so the app can redirect to login.
 */
export async function refreshTokens(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return false;
  }

  const base = import.meta.env.VITE_API_BASE_URL || '';
  try {
    const res = await fetch(`${base}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) {
      throw new Error(`refresh failed: ${res.status}`);
    }
    const tokens: AuthTokens = await res.json();
    saveTokens(tokens);
    return true;
  } catch (err) {
    console.error('refreshTokens error', err);
    clearTokens();
    return false;
  }
}

/**
 * Ensure there is a valid access token.  If the token is expired or will
 * expire soon, attempt a network refresh.  Returns the token or null.
 */
export async function ensureValidAccessToken(): Promise<string | null> {
  if (!getAccessToken() || isTokenExpired() || willExpireSoon()) {
    const ok = await refreshTokens();
    if (!ok) return null;
  }
  return getAccessToken();
}

