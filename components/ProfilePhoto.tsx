/* eslint-disable @next/next/no-img-element */
"use client";

import React, {
  useActionState,
  useEffect,
  useState,
  startTransition,
} from "react";
import { Camera, User, Upload } from "lucide-react";
import { getAvatar } from "@/actions/profile";
import { uploadAvatar } from "@/actions/uploads";

export default function ProfilePhoto() {
  const [avatar, setAvatar] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const initialState = {
    success: false,
    data: "null",
    error: true,
  };
  const [state, formAction, isUploading] = useActionState(
    uploadAvatar,
    initialState
  );

  const getUserData = async () => {
    try {
      const avatar = await getAvatar();

      if (avatar.success) {
        setAvatar(avatar.data || "");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    startTransition(() => {
      getUserData();
    });
  }, []);

  useEffect(() => {
    if (state.success) {
      getUserData();
    }
  }, [state]);

  return (
    <div className="w-full lg:w-1/3 flex items-center align-middle justify-center">
      <div className="flex flex-col items-center bg-base-200 p-4 sm:p-8 rounded-xl">
        <div className="avatar">
          <div className="w-32 sm:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 hover:scale-105 transition-transform">
            {avatar ? (
              <img src={avatar} alt="Profile" className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-base-200">
                <User className="w-20 h-20 text-base-content opacity-40" />
              </div>
            )}
          </div>
        </div>
        {state.error && <div className="text-error mt-2">{state.data}</div>}
        {selectedFile && (
          <div className="mt-2">Selected file: {selectedFile}</div>
        )}
        <form action={formAction} className="flex gap-2">
          <label
            htmlFor="image-upload"
            className="btn btn-primary mt-4 sm:mt-6 gap-2 hover:btn-secondary transition-colors text-sm sm:text-base"
          >
            <Camera className="h-4 sm:h-5 w-4 sm:w-5" />
            <input
              id="image-upload"
              name="file"
              type="file"
              className="hidden"
              accept="image/*"
              disabled={isUploading}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedFile(e.target.files[0].name);
                  console.log(e.target.files[0]);
                }
              }}
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary mt-4 sm:mt-6 gap-2 hover:btn-secondary transition-colors"
            disabled={isUploading}
          >
            <Upload className="h-4 sm:h-5 w-4 sm:w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
