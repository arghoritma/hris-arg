import ProfileForm from "@/components/ProfileForm";
import ProfilePhoto from "@/components/ProfilePhoto";

export default function ProfilePage() {
  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-base-100">
          <div className="p-4 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-primary">
              Edit Profile
            </h2>

            <div className="flex flex-col lg:flex-row gap-6 sm:gap-12">
              <ProfilePhoto />
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
