"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerDefaultValues,
  RegisterSchema,
  registerSchema,
} from "./auth.schema";
import { useForm } from "react-hook-form";
import CommonSubmitButton from "../shared/CommonSubmitButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useUserRegisterMutation } from "@/src/services/auth/auth.mutations";
import { toast } from "sonner";
import Link from "next/link";

function RegisterForm() {
  const router = useRouter();
  const { mutate, isPending } = useUserRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const onSubmit = (values: RegisterSchema) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Registration successful! Please login.");
        window.location.href = "/login/";
      },

      onError: (error: any) => {
        const errorData = error?.response?.data;
        let message = "Registration failed. Please try again.";

        if (typeof errorData === "object" && errorData !== null) {
          // Flatten DRF field errors: e.g. { "username": ["exists"], "email": ["invalid"] }
          const errorMessages = Object.entries(errorData)
            .map(([field, msgs]) => {
              const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
              const fieldMsgs = Array.isArray(msgs) ? msgs.join(" ") : msgs;
              return `${fieldName}: ${fieldMsgs}`;
            })
            .join(" | ");

          if (errorMessages) message = errorMessages;
        } else if (errorData?.message) {
          message = errorData.message;
        }

        toast.error(message);
      },
    });
  };
  return (
    <div className=" w-full min-h-screen flex-center">
      <div className=" md:absolute md:w-[500px] flex-center flex-col p-3 pb-0 bg-gradient-to-tl from-gray-50 via-white to-gray-100 rounded-2xl shadow-xl border border-border">
        <Image src={"/logo-perk.png"} alt="" width={100} height={100} />
        <div className=" w-full mt-[24px] p-3 pb-7 md:overflow-auto">
          <Form {...form}>
            <form
              id="register-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full flex flex-col items-center"
            >
              <div className=" w-full grid grid-cols-1 gap-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage className="text-[10px] font-light" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="eg. abc@123.com" {...field} />
                      </FormControl>
                      <FormMessage className="text-[10px] font-light" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="pr-8"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-slate-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-slate-500" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-[10px] font-light" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex items-center justify-end">
                <p className=" text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a
                    className=" font-medium text-default hover:underline"
                    href={"/login/"}
                  >
                    Login
                  </a>
                </p>
              </div>
              <CommonSubmitButton
                id="register-submit"
                className="perk-gradient"
                loading={isPending}
                onClick={form.handleSubmit(onSubmit)}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
