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
import { useRouter } from "next/navigation";
import React from "react";

interface SubscriptionAlertProps {
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

function SubscriptionAlert({ alert, setAlert }: SubscriptionAlertProps) {
  const router = useRouter();
  return (
    <AlertDialog open={alert} onOpenChange={() => setAlert((prev) => !prev)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You Don&apos;t Have a Subscription
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please subscribe to access premium features.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              window.location.href = "/register/index.html";
            }}
          >
            To Subscription
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SubscriptionAlert;
