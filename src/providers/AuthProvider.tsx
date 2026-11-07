"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/src/store/authStore";
import { useGetUserProfile } from "../services/auth/auth.queries";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "../utilities/cookiesHelpers";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const accessToken = useAuthStore((s) => s.accessToken);

  const pathname = usePathname();
  const router = useRouter();
  const [isRehydrated, setIsRehydrated] = useState(false);

  // Rehydrate tokens once on mount
  useEffect(() => {
    let access: string | null = null;
    let refresh: string | null = null;

    try {
      access = localStorage.getItem("access_token");
      refresh = localStorage.getItem("refresh_token");
    } catch {
      // Storage access may be restricted in Safari / private browsing
    }

    if (!access) {
      access = getCookie("access_token");
    }
    if (!refresh) {
      refresh = getCookie("refresh_token");
    }

    if (access && refresh) {
      setTokens(access, refresh);
    }
    setIsRehydrated(true);
  }, [setTokens]);

  const { data, isError, error, isLoading } = useGetUserProfile(!!accessToken);

  // Sync profile to Zustand
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  // Client-side protection logic
  useEffect(() => {
    if (!isRehydrated) return;

    // Check accessToken from store or fallback directly to storage/cookies
    // to prevent any race condition where rehydration state lags behind in Safari
    let currentToken = accessToken;
    if (!currentToken) {
      try {
        currentToken = localStorage.getItem("access_token");
      } catch {
        // Storage access restricted
      }
      if (!currentToken) {
        currentToken = getCookie("access_token");
      }
    }

    const isDashboardRoute = pathname?.startsWith("/dashboard");
    const isAuthRoute =
      pathname?.startsWith("/login") || pathname?.startsWith("/register");

    // 1. Redirect unauthenticated users from dashboard to login
    if (isDashboardRoute && !currentToken && !isLoading) {
      window.location.href = "/login/";
    }

    // 2. Redirect authenticated users from login/register to dashboard
    if (isAuthRoute && currentToken && data) {
      window.location.href = "/dashboard/";
    }
  }, [isRehydrated, pathname, accessToken, isLoading, data]);

  // Logout if profile fails with 401 Unauthorized (expired token)
  useEffect(() => {
    if (
      isError &&
      accessToken &&
      (error as any)?.response?.status === 401
    ) {
      logout();
      window.location.href = "/login/";
    }
  }, [isError, error, logout, accessToken]);

  return children;
}
