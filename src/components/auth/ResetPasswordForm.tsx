"use client";

import { User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import CommonSubmitButton from "../shared/CommonSubmitButton";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function ResetPasswordForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async () => {
    setLoading(true);
    // await sendPasswordResetEmail(auth, email).catch((error) => {
    //   console.error("Failed to send email: ", error);
    // });
    toast.success("Email sent", {
      description: `If this email address is registered with us, you'll receive a password reset link shortly.`,
    });
    setLoading(false);
  };

  return (
    <div className=" w-full h-screen flex-center p-5 md:p-0">
      <div className=" max-h-[90dvh] w-[500px] flex-center flex-col p-3 bg-gradient-to-tl from-gray-50 via-white to-gray-100 rounded-2xl shadow-xl border border-border">
        <Image src={"/logo.png"} alt="" width={100} height={100} />
        <div className="grid w-full max-w-sm items-center gap-3 mb-8 mt-6">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Email"
          />
        </div>
        <CommonSubmitButton
          id="reset-submit"
          onClick={handleSubmit}
          disabled={loading}
          loading={loading}
        />
        <Link
          href="/login"
          className=" text-default hover:underline flex-center gap-3 mt-8 "
        >
          {" "}
          <User className="size-5" /> Back To Login
        </Link>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
