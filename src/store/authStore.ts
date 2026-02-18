import { create } from "zustand";
import { deleteCookie, setCookie } from "../utilities/cookiesHelpers";

export interface MemberProfile {
  membership_type: "FREE" | "STANDARD" | "PREMIUM";
  membership_status: "UNPAID" | "ACTIVE" | "EXPIRED";
  membership_expiry: string | null;
  membership_id: string;
  qr_code: string | null;
  is_active: boolean;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  member_profile: MemberProfile;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;

  setTokens: (access: string, refresh: string) => void;
  setUser: (user: UserProfile) => void;
  logout: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,

  setTokens: (access, refresh) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setCookie("access_token", access, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    setCookie("refresh_token", refresh, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: true,
    });
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    deleteCookie("access_token");
    deleteCookie("refresh_token");

    document.cookie = "access_token=; Max-Age=0; path=/;";

    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  },

  reset: () => {
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));
