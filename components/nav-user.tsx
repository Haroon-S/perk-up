"use client";

import { BadgeCheck, ChevronsUpDown, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { useGetUserProfile } from "@/src/services/auth/auth.queries";

export function NavUser() {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const { data: profileData, isFetched } = useGetUserProfile(!!useAuthStore.getState().accessToken);

  const currentUser = profileData || user;
  const isProfileReady = isFetched || !!user;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback className="rounded-lg">
                  <User className="size-5" />
                </AvatarFallback>
              </Avatar>
              {!isProfileReady ? (
                <div className="grid flex-1 text-left text-sm leading-tight gap-1.5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <div className="h-3 w-20 bg-sidebar-accent rounded animate-pulse" />
                  <div className="h-2 w-28 bg-sidebar-accent/50 rounded animate-pulse" />
                </div>
              ) : (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{currentUser?.username}</span>
                  <span className="truncate text-xs">{currentUser?.email}</span>
                </div>
              )}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">
                    <User className="size-5" />
                  </AvatarFallback>
                </Avatar>
                {!isProfileReady ? (
                  <div className="grid flex-1 text-left text-sm leading-tight gap-1.5">
                    <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
                    <div className="h-2 w-28 bg-slate-100 rounded animate-pulse" />
                  </div>
                ) : (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{currentUser?.username}</span>
                    <span className="truncate text-xs">{currentUser?.email}</span>
                  </div>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/dashboard/account")}>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
