import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PerkUp",
    short_name: "PerkUp",
    description: "Exclusive discounts around the island for just €3.99/month.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#4F6EFF",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
