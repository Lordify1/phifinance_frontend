import { advisorUrl } from "@/app";
import { classMap, colorMap } from "@/components/Tools/Misc";
import SendRequest from "@/components/Tools/SendRequest";
import { founderSidebar } from "@/data/founderSidebarData";
import { investorSidebar } from "@/data/investorSidebarData";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaEdit } from "react-icons/fa";

// Import all avatars from folder (e.g. /public/avatars)
const avatarImages = import.meta.glob("/public/assets/avatars/*.png", { eager: true });

// console.log(avatarImages)

const Profile = ({ user }) => {
  const [data, setData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "founder",
    avatar: user?.avatar || Object.values(avatarImages)[0]?.default,
  });


  console.log(user)

  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Fields config (Loop instead of hardcoding)
  const fields = [
    { id: "name", label: "Name", type: "text", editable: true },
    { id: "username", label: "Username", type: "text", editable: true },
    { id: "email", label: "Email", type: "text", editable: false },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAvatarSelect = (src) => {
    setData((prev) => ({ ...prev, avatar: src }));
    setShowAvatarPicker(false);
  };

  const handleRoleChange = (role) => {
    setData((prev) => ({ ...prev, role }));
  };

  const sidebarData = data.role === "founder" ? founderSidebar : investorSidebar;

  return (
    <>
      <Head title="Profile" />
      <DashboardLayout
        title="Profile"
        sidebarDataType={data.role}
        sidebarData={sidebarData}
      >
        <div className="grid place-items-center w-full min-h-[80vh]">
          <div className="p-6 rounded-2xl shadow-lg w-full max-w-xl space-y-6">
            {/* Avatar Section */}
            <div className="relative flex flex-col items-center">
              <img
                src={data.avatar}
                alt="Avatar"
                className={`w-28 ${classMap.hoverImg} ${colorMap.border_primary} h-28 rounded-xl object-cover border-4  shadow-lg`}
              />
              <button
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className={`absolute top-0 right-1 ${colorMap.text_secondary} p-2 rounded-full ${classMap.hover()} transition`}
                title="Change Avatar"
              >
                <FaEdit />
              </button>

              {/* Avatar Picker Dropdown */}
              {showAvatarPicker && (
                <div className={`mt-4 grid grid-cols-4 gap-2 p-4 rounded-xl border border-gray-700 shadow-lg animate-fadeIn transition-all duration-500`}>
                  {Object.values(avatarImages).map((img: any, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAvatarSelect(img.default)}
                      className={`w-30 ${classMap.hoverImg} h-30 rounded-xl border-2 hover:${colorMap.border_primary} transition-all ${
                        data.avatar === img.default ? `${colorMap.border_primary}` : "border-gray-600"
                      }`}
                    >
                      <img
                        src={img.default}
                        alt={`avatar-${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fields Section */}
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className={`${classMap.label}`}>
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={field.type}
                      id={field.id}
                      value={data[field.id]}
                      onChange={field.editable ? handleChange : undefined}
                      readOnly={!field.editable}
                      disabled={!field.editable}
                      className={`${classMap.input()} ${
                        !field.editable ? "bg-[var(--muted)] cursor-not-allowed" : ""
                      }`}
                    />
                    {/* Email verification icon */}
                    {field.id === "email" && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2">
                        {user?.email_verified_at ? (
                          <FaCheckCircle className={`${colorMap.text_primary}`} title="Email Verified" />
                        ) : (
                          <SendRequest
                          url={`/email/verification-notification`}
                          method="post"
                          onResponse={() => {}}
                          useIcon={true}
                          className="text-sm"
                          text="Verify"
                          direction="none"
                          title="Verify Email"
                          />
                        )}
                      </span>
                    )}

                    {field.id === "username" && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2">
                        <button className={classMap.iconButton}>.fsc</button>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Role Toggle */}
            <div>
              <label className={`${classMap.label}`}>User Type</label>
              <div className="flex items-center gap-4 mt-2">
                {["founder", "investor"].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    className={`px-4 py-2 rounded-xl font-semibold capitalize transition border ${
                      data.role === role
                        ? `${colorMap.bg_primary}`
                        : `${colorMap.bg_secondary}`
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
              <SendRequest
              url={`/advisor/profile`}
              method="post"
              data={data}
              text="Update"
              onResponse={() => {}}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Profile;