import React from "react";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import GoogleLogin from "@/components/GoogleLogin";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 border rounded-lg p-8 transform transition-all hover:scale-[1.01]">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">Create Account</h2>
        </div>
        <div className="space-y-4">
          <GoogleLogin />
          <div className="divider">or continue with</div>
          <RegisterForm />
        </div>
        <div className="text-sm text-center">
          <Link
            href="/auth/login"
            className="hover:text-foreground hover:underline"
          >
            Already have an account? Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
