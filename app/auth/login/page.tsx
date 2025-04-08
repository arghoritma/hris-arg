import React from "react";
import LoginForm from "@/components/LoginForm";
import GoogleLogin from "@/components/GoogleLogin";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 border rounded-lg p-8 transform transition-all hover:scale-[1.01]">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">Welcome Back!</h2>
          <p>Boost your productivity today with our Todo App!</p>
        </div>
        <div className="space-y-4">
          <GoogleLogin />
          <div className="divider">or continue with</div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
