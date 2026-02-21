// Client-side cookie helpers
export function setCookie(
  name: string,
  value: string,
  options: {
    maxAge?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
  } = {}
) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.maxAge) {
    cookieString += `; max-age=${options.maxAge}`;
  }
  if (options.path) {
    cookieString += `; path=${options.path}`;
  } else {
    cookieString += "; path=/";
  }
  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }
  if (options.secure || process.env.NODE_ENV === "production") {
    cookieString += "; secure";
  }
  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  } else {
    cookieString += "; samesite=lax";
  }

  if (typeof document !== "undefined") {
    document.cookie = cookieString;
  }
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const b = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return b ? decodeURIComponent(b.pop()!) : null;
}

export function deleteCookie(name: string) {
  setCookie(name, "", { maxAge: -1 });
}
