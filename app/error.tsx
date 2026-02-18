"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import React from "react";

function error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className=" w-full h-screen flex-center">
      <div className="flex-center flex-col gap-5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-8 w-8 text-red-600" aria-hidden="true" />
        </div>
        <h1 className=" text-2xl font-bold text-black text-center">
          Something went wrong go back
        </h1>
        <p className="text-base text-black text-center">{error.message}</p>
        <Button onClick={reset} className="font-semibold cursor-pointer">
          Reset
        </Button>
      </div>
    </div>
  );
}

export default error;
