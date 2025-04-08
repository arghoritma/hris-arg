"use client";

import React from "react";
import menuItems from "@/libs/menus";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <div className="menu z-[100] p-4 pt-20 w-60 min-h-full bg-base-200 text-base-content sm:pt-4">
        <div className="flex items-center gap-2 mb-4 sm:flex hidden">
          <h2 className="text-xl font-bold">Nextar</h2>
        </div>
        <ul>
          {menuItems.map((item) => (
            <li key={item.key}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 ${
                  item.path === pathname ? "active" : ""
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
