"use client";

import React, { useEffect, useState } from "react";
import { getProfile } from "@/actions/profile";

interface ProfileProps {
  name: string;
  email: string;
}

export default function ProfileInfo() {
  const [user, setUser] = useState<ProfileProps>({ name: "", email: "" });

  useEffect(() => {
    const gethUser = async () => {
      try {
        const profile = await getProfile();
        setUser(profile.data);
        console.log(profile);
      } catch (error) {
        console.error("Failed to get user:", error);
      }
    };

    gethUser();
  }, []);

  return (
    <div className="flex items-center gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
      <div>
        <p className="text-sm font-semibold">
          {user.name.length > 13 ? user.name.slice(0, 12) + "..." : user.name}
        </p>
        <p className="text-xs text-gray-500">
          {user.email.length > 15
            ? user.email.slice(0, 14) + "..."
            : user.email}
        </p>
      </div>
    </div>
  );
}
