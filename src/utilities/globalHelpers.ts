import moment from "moment";
import { NextRequest } from "next/server";

export function capitalizeText(input: string): string {
  if (input)
    return input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  return "";
}

export function replaceWithSpace(input: string, separator = "_"): string {
  if (input) return input.replaceAll(separator, " ");
  return "";
}

export function truncateText(str: string, limit = 50) {
  if (!str) return "";
  return str.length > limit ? str.substring(0, limit) + "..." : str;
}
export function formattedDate(date: string, format = "MMM D, YYYY"): string {
  if (!date) return "";
  return moment(date).format(format);
}

export function noDataText(): string {
  return "N/A";
}

// export function getUserRole(status?: string | null): string {
//   if (status === ADMIN) {
//     return "Admin";
//   } else if (status === OWNER) {
//     return "Owner";
//   } else {
//     return "N/A";
//   }
// }

// export function getHotelStatus(status?: string | null): string {
//   if (status === ACTIVE_STATUS) {
//     return "Active";
//   } else if (status === INACTIVE_STATUS) {
//     return "Inactive";
//   } else if (status === SUSPENDED_STATUS) {
//     return "Suspended";
//   } else {
//     return "N/A";
//   }
// }

export function isColorLight(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const requestHeaders = (req: NextRequest) => {
  const headers: Record<string, string> = {};

  // Convert the Headers object to a plain object
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // Remove headers you don't want to forward
  delete headers["host"];
  delete headers["connection"];
  delete headers["content-length"];

  return headers;
};

export const handleScrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
