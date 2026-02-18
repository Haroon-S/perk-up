import { Partners } from "@/src/components/landingPage/Partners";
import React from "react";

const partners = [
  {
    id: 1,
    logo: "/logo.png",
    name: "Partner One",
    description: "Partner One",
    location: "Times Square, Manhattan, NY, USA",
  },
  {
    id: 2,
    logo: "/logo.png",
    name: "Partner Two",
    description: "Partner Two",
    location: "Times Square, Manhattan, NY, USA",
  },
  {
    id: 3,
    logo: "/logo.png",
    name: "Partner Three",
    description: "Partner Three",
    location: "Times Square, Manhattan, NY, USA",
  },
  {
    id: 4,
    logo: "/logo.png",
    name: "Partner Four",
    description: "Partner Four",
    location: "Times Square, Manhattan, NY, USA",
  },
  {
    id: 5,
    logo: "/logo.png",
    name: "Partner Five",
    description: "Partner Five",
    location: "Times Square, Manhattan, NY, USA",
  },
  {
    id: 6,
    logo: "/logo.png",
    name: "Partner Six",
    description: "Partner Six",
    location: "Times Square, Manhattan, NY, USA",
  },
];

function AllPartnersPage() {
  return (
    <main className=" min-h-screen bg-black">
      <Partners partners={partners} />
    </main>
  );
}

export default AllPartnersPage;
