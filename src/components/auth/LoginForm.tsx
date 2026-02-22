"use client";

import Image from "next/image";
import React, { useState } from "react";
import CommonSubmitButton from "../shared/CommonSubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginDefaultValues, loginSchema, LoginSchema } from "./auth.schema";
import { useUserLoginMutation } from "@/src/services/auth/auth.mutations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "next/navigation";

function LoginForm() {
  const setTokens = useAuthStore((s) => s.setTokens);
  const router = useRouter();
  const { mutate, isPending } = useUserLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  async function onSubmit(values: LoginSchema) {
    mutate(values, {
      onSuccess: (data) => {
        const access = data.tokens.access;
        const refresh = data.tokens.refresh;

        setTokens(access, refresh);
        toast.success("Login successful!");
        router.push("/dashboard");
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message || "Invalid email or password";

        toast.error("Login failed!", {
          description: message,
        });
        form.setError("email", {
          type: "manual",
          message: "Invalid credentials",
        });
      },
    });
  }

  return (
    <div className=" w-full h-screen  flex-center p-10">
      <div className=" w-full md:w-[500px] flex-center flex-col p-3 bg-gradient-to-tl from-gray-50/65 via-white/65 to-gray-100/65 backdrop-blur-sm rounded-2xl shadow-xl border border-border">
        <Image src={"/logo-perk.png"} alt="" width={100} height={100} />
        <div className=" w-full mt-[24px] p-3">
          <Form {...form}>
            <form
              id="login-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full flex flex-col items-center"
            >
              <div className=" w-full grid grid-cols-2 gap-6 md:gap-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="eg. abc@123.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] font-light" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
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
                <div className="col-span-2 md:col-span-1">
                  <p className=" text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      className=" font-medium text-default hover:underline"
                      href={"/register"}
                    >
                      Register
                    </Link>
                  </p>
                </div>
                <div className={"col-span-2 md:col-span-1 text-right"}>
                  <p className="text-sm text-muted-foreground">
                    Forgot Password?{" "}
                    <Link
                      className=" font-medium text-default hover:underline"
                      href={"/reset-password"}
                    >
                      Click Here
                    </Link>
                  </p>
                </div>
              </div>
              <CommonSubmitButton
                id="login-submit"
                className="shadow-md perk-gradient"
                onClick={form.handleSubmit(onSubmit)}
                loading={isPending}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
