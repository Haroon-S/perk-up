"use client";

import { Partners } from "@/src/components/landingPage/Partners";
import { useGetPartners } from "@/src/services/perkup/perkup.queries";
import React from "react";

function AllPartnersPage() {
  const { data: realPartners, isLoading } = useGetPartners();
  return (
    <main className=" min-h-screen bg-black">
      <Partners partners={realPartners || []} isLoading={isLoading} />
    </main>
  );
}

export default AllPartnersPage;
