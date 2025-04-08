"use client";

import React, { useEffect, useState } from "react";
import { updateProfile, getProfile } from "@/actions/profile";
import { FormState, UserProp } from "@/libs/definitions";
import { useActionState } from "react";
import { AlertCircle } from "lucide-react";

export default function ProfileForm() {
  const initialState: FormState = {
    success: false,
    errors: {},
  };

  const [profile, setProfile] = useState<UserProp>();
  const [state, actionUpdate, isPending] = useActionState(
    updateProfile,
    initialState
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        if (profile) {
          setProfile(profile.data as UserProp);
        }
        console.log("Profile:", profile);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [state]);

  return (
    <form
      action={actionUpdate}
      className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
    >
      {state?.errors?._form && (
        <div role="alert" className="alert alert-error">
          <AlertCircle className="h-5 w-5" />
          {state.errors._form}
        </div>
      )}

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium">Full Name</span>
        </label>
        <input
          type="text"
          name="name"
          defaultValue={profile?.name}
          className="input input-bordered w-full focus:input-primary text-sm sm:text-base"
          placeholder="Enter your full name"
        />
        {state.errors?.name && (
          <div className="text-error text-sm">{state.errors.name}</div>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium">Phone Number</span>
        </label>
        <input
          type="tel"
          name="phone"
          defaultValue={profile?.phone as string}
          className="input input-bordered w-full focus:input-primary text-sm sm:text-base"
          placeholder="Enter your phone number"
        />
        {state.errors?.phone && (
          <div className="text-error text-sm">{state.errors.phone}</div>
        )}
      </div>

      <div className="flex justify-end gap-3 sm:gap-4 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary hover:btn-secondary btn-sm sm:btn-md"
        >
          {isPending ? (
            <>
              <span className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              Processing...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}
