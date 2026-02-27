import { Loader2 } from "lucide-react";
import React from "react";

function SectionLoader() {
  return (
    <div className=" w-full h-full flex-center">
      <Loader2 className=" size-12 animate-spin text-primary" />
    </div>
  );
}

export default SectionLoader;
