import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { AxiosError } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 export function isAxiosError<T = any>(error: unknown): error is AxiosError<T> {
    return (
      typeof error === "object" &&
      error !== null &&
      (error as any).isAxiosError === true
    );
  }