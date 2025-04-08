"use client";
import React from "react";

interface FileType {
  id: string;
  file_name: string;
  file_url: string;
  uploaded_by: string;
  uploaded_at: Date;
}

export default function TableFiles({ files }: { files: FileType[] }) {
  if (!files || files.length === 0) {
    return (
      <div className="overflow-x-auto">
        <p>No files found.</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Upload Date</th>
            <th>File URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files?.map((file) => (
            <tr key={file.id}>
              <td>{file.file_name}</td>
              <td>{new Date(file.uploaded_at).toLocaleDateString()}</td>
              <td>
                <a
                  href={file.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  View File
                </a>
              </td>
              <td>
                <button className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
