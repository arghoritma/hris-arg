"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff, AlertCircle, Mail, User, Lock } from "lucide-react";
import { signup } from "@/actions/auth";
import { FormState } from "@/libs/definitions";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const initialState: FormState = {
    success: false,
    errors: {},
  };

  const [state, actionRegister, isPending] = useActionState(
    signup,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      redirect("/dashboard");
    }
  }, [state]);

  return (
    <form className="mt-8 space-y-6 " action={actionRegister}>
      {state?.errors?._form && (
        <div role="alert" className="alert alert-error">
          <AlertCircle className="h-5 w-5" />
          {state.errors._form}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              className="block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground placeholder:text-muted-foreground"
              placeholder="johndoe"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5" />
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
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5" />
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
                <EyeOff className="h-5 w-5" aria-label="Hide password" />
              ) : (
                <Eye className="h-5 w-5" aria-label="Show password" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground placeholder:text-muted-foreground"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" aria-label="Hide password" />
              ) : (
                <Eye className="h-5 w-5" aria-label="Show password" />
              )}
            </button>
          </div>
          {password !== confirmPassword && confirmPassword !== "" && (
            <div className="text-error text-sm">Passwords do not match</div>
          )}
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isPending || password !== confirmPassword}
          className="w-full flex justify-center items-center py-3 px-4 rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <span className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              Processing...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </form>
  );
}
