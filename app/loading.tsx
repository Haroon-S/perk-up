import { Loader2 } from "lucide-react";
import React from "react";

function SpinnerLoading() {
  return (
    <div className=" w-full h-screen flex-center">
      <Loader2 className=" animate-spin size-16 text-primary" />
    </div>
  );
}

export default SpinnerLoading;
