import { getFiles } from "@/actions/files";
import UploadForm from "@/components/UploadForm";
import TableFiles from "@/components/TableFiles";

export default async function Page() {
  const { data: files } = await getFiles();

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="card bg-base-100 shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-4">File Management</h1>
          <UploadForm />
          <TableFiles files={files || []} />
        </div>
      </div>
    </div>
  );
}
