import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

function CommonSubmitButton({
  id,
  loading,
  className = "",
  onClick = () => {},
  disabled = false,
  label = "Submit",
  loadingLabel = "Submitting...",
  defaultVariant = false,
}: {
  id: string;
  loading?: boolean;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  loadingLabel?: string;
  defaultVariant?: boolean;
}) {
  return (
    <div className="relative flex-center group">
      <Button
        id={id}
        className={cn(
          !defaultVariant &&
            "relative z-10 h-[40px] w-[180px] text-[14px] font-medium text-primary-foreground disabled:cursor-not-allowed",
          className,
        )}
        type="submit"
        onClick={onClick}
        disabled={disabled || loading}
      >
        {loading ? loadingLabel : label}
        {loading && (
          <Loader2 className=" animate-spin ml-2 !w-[16px] !h-[16px]" />
        )}
      </Button>
    </div>
  );
}

export default CommonSubmitButton;
