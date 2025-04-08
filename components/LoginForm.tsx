"use client";

import React, { useActionState, useState, useEffect } from "react";
import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { signin } from "@/actions/auth";
import { FormState } from "@/libs/definitions";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const initialState: FormState = {
    success: false,
    errors: {},
  };

  const [state, actionLogin, isPending] = useActionState(signin, initialState);

  useEffect(() => {
    if (state.success) {
      redirect("/dashboard");
    }
  }, [state]);

  return (
    <form className="mt-8 space-y-6" action={actionLogin}>
      {state.errors?._form && (
        <div role="alert" className="alert alert-error">
          <AlertCircle className="h-5 w-5" />
          <span>{state.errors._form}</span>
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              className="block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground placeholder:text-muted-foreground"
              placeholder="you@example.com"
              required
            />
          </div>
          {state.errors?.email && (
            <div className="text-error text-sm">{state.errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground placeholder:text-muted-foreground"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff
                  className="h-5 w-5 text-muted-foreground"
                  aria-label="Hide password"
                />
              ) : (
                <Eye
                  className="h-5 w-5 text-muted-foreground"
                  aria-label="Show password"
                />
              )}
            </button>
          </div>
          {state.errors?.password && (
            <div className="text-error text-sm">{state.errors.password}</div>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center items-center py-3 px-4 rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <span className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              Processing...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <a
            href="/auth/register"
            className="hover:text-foreground hover:underline"
          >
            Don&apos;t have an account?
          </a>
        </div>
        <div className="text-sm">
          <a href="#" className="hover:text-foreground hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </form>
  );
}
