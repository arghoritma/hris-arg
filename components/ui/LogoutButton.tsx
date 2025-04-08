"use client";

import React, { useState } from "react";
import { logout } from "@/actions/auth";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="flex items-center gap-2" onClick={handleLogout}>
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <LogOut size={16} />
      )}
      {loading ? "Loging Out..." : "Logout"}
    </button>
  );
}
