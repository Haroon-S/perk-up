import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/src/store/authStore";
import React from "react";

interface SubscriptionAlertProps {
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  type?: "redeem" | "upgrade";
}

function SubscriptionAlert({ alert, setAlert, type = "redeem" }: SubscriptionAlertProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isUpgrade = type === "upgrade";

  return (
    <AlertDialog open={alert} onOpenChange={setAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isUpgrade ? "Upgrade to Premium" : "Premium Perk"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isUpgrade
              ? "Gain unlimited access to all perks and exclusive discounts by upgrading to a Premium membership."
              : "This is a premium perk. Please upgrade your membership to unlock and redeem this offer."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {(!isAuthenticated && !isUpgrade) ? (
            <>
              <AlertDialogCancel onClick={() => setAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  setAlert(false);
                  window.location.href = "/register/";
                }}
              >
                To Subscription
              </AlertDialogAction>
            </>
          ) : (
            <>
              <AlertDialogCancel onClick={() => setAlert(false)}>Not Now</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  setAlert(false);
                  window.location.href = "/dashboard/membership/";
                }}
              >
                Upgrade Now
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SubscriptionAlert;
