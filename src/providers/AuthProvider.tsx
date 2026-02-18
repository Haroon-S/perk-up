"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/src/store/authStore";
import { useGetUserProfile } from "../services/auth/auth.queries";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const accessToken = useAuthStore((s) => s.accessToken);

  // Rehydrate tokens once
  useEffect(() => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");

    if (access && refresh) {
      setTokens(access, refresh);
    }
  }, [setTokens]);

  const { data, isError } = useGetUserProfile(!!accessToken);

  // Sync profile to Zustand
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  // Logout if profile fails (expired token)
  useEffect(() => {
    if (isError && accessToken) {
      logout();
    }
  }, [isError, logout, accessToken]);

  return children;
}
