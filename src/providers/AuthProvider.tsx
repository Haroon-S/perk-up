"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/src/store/authStore";
import { useGetUserProfile } from "../services/auth/auth.queries";
import { usePathname, useRouter } from "next/navigation";

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
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");

    if (access && refresh) {
      setTokens(access, refresh);
    }
    setIsRehydrated(true);
  }, [setTokens]);

  const { data, isError, isLoading } = useGetUserProfile(!!accessToken);

  // Sync profile to Zustand
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  // Client-side protection logic
  useEffect(() => {
    if (!isRehydrated) return;

    const isDashboardRoute = pathname?.startsWith("/dashboard");
    const isAuthRoute = pathname === "/login" || pathname === "/register";

    // 1. Redirect unauthenticated users from dashboard to login
    if (isDashboardRoute && !accessToken && !isLoading) {
      router.push("/login");
    }

    // 2. Redirect authenticated users from login/register to dashboard
    if (isAuthRoute && accessToken && data) {
      router.push("/dashboard");
    }
  }, [isRehydrated, pathname, accessToken, isLoading, data, router]);

  // Logout if profile fails (expired token)
  useEffect(() => {
    if (isError && accessToken) {
      logout();
      router.push("/login");
    }
  }, [isError, logout, accessToken, router]);

  return children;
}
