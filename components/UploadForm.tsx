"use client";

import React, { useActionState } from "react";
import { uploadFile } from "@/actions/uploads";
import { FormState } from "@/libs/definitions";

export default function UploadForm() {
  const initialState: FormState = {
    success: false,
    errors: {},
  };
  const [state, actionUpload, isPending] = useActionState(
    uploadFile,
    initialState
  );

  return (
    <div className="mb-8">
      <form action={actionUpload}>
        <div className="flex gap-4">
          <input
            type="file"
            name="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending ? "Uploading..." : "Upload File"}
          </button>{" "}
        </div>
        {!state.success && (
          <p className="text-red-500 mt-2">{state.errors?._form}</p>
        )}
      </form>
    </div>
  );
}
