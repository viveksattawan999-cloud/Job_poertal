import { useEffect, useState } from "react";
import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  BriefcaseBusiness,
  Save,
  Upload,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const STORAGE_KEY = "jobhub_recruiter_profile";

const defaultProfile = {
  companyName: "",
  industry: "",
  companySize: "",
  location: "",
  website: "",
  description: "",
  logo: "",
  recruiterName: "",
  recruiterEmail: "",
  recruiterPhone: "",
  linkedin: "",
  twitter: "",
};

function RecruiterProfilePage() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(defaultProfile);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEY);

    if (savedProfile) {
      try {
        setProfile({
          ...defaultProfile,
          ...JSON.parse(savedProfile),
        });
      } catch {
        setProfile(defaultProfile);
      }
    } else {
      setProfile({
        ...defaultProfile,
        recruiterName: user?.name || "",
        recruiterEmail: user?.email || "",
      });
    }
  }, [user]);

  const updateField = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));

    setMessage("Company profile saved successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Logo must be smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateField("logo", reader.result);
      setMessage("Logo selected successfully.");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Company Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your company and recruiter information.
        </p>
      </div>

      {message && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Company Logo */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Company Logo
          </h2>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
            {profile.logo ? (
              <img
                src={profile.logo}
                alt="Company logo"
                className="h-24 w-24 rounded-2xl border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Building2 size={36} />
              </div>
            )}

            <div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                <Upload size={18} />
                Upload Logo

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>

              <p className="mt-2 text-xs text-slate-400">
                PNG, JPG or WEBP. Maximum size 2 MB.
              </p>
            </div>
          </div>
        </section>

        {/* Company Information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Company Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tell candidates about your company.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Company Name"
              required
              icon={<Building2 size={18} />}
              value={profile.companyName}
              onChange={(value) =>
                updateField("companyName", value)
              }
              placeholder="e.g. TechNova Solutions"
            />

            <Input
              label="Industry"
              icon={<Building2 size={18} />}
              value={profile.industry}
              onChange={(value) =>
                updateField("industry", value)
              }
              placeholder="e.g. Information Technology"
            />

            <Select
              label="Company Size"
              value={profile.companySize}
              onChange={(value) =>
                updateField("companySize", value)
              }
              options={[
                "1-10 employees",
                "11-50 employees",
                "51-200 employees",
                "201-500 employees",
                "501-1000 employees",
                "1000+ employees",
              ]}
            />

            <Input
              label="Location"
              icon={<MapPin size={18} />}
              value={profile.location}
              onChange={(value) =>
                updateField("location", value)
              }
              placeholder="Jaipur, Rajasthan"
            />

            <Input
              label="Company Website"
              icon={<Globe size={18} />}
              value={profile.website}
              onChange={(value) =>
                updateField("website", value)
              }
              placeholder="https://company.com"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700">
              Company Description

              <textarea
                value={profile.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value
                  )
                }
                maxLength={1000}
                rows={6}
                placeholder="Describe your company, culture, products and mission..."
                className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </label>

            <p className="mt-2 text-xs text-slate-400">
              {profile.description.length}/1000 characters
            </p>
          </div>
        </section>

        {/* Recruiter Information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Recruiter Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your contact information as a recruiter.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Recruiter Name"
              required
              icon={<User size={18} />}
              value={profile.recruiterName}
              onChange={(value) =>
                updateField("recruiterName", value)
              }
              placeholder="Your full name"
            />

            <Input
              label="Recruiter Email"
              type="email"
              required
              icon={<Mail size={18} />}
              value={profile.recruiterEmail}
              onChange={(value) =>
                updateField("recruiterEmail", value)
              }
              placeholder="recruiter@company.com"
            />

            <Input
              label="Recruiter Phone"
              icon={<Phone size={18} />}
              value={profile.recruiterPhone}
              onChange={(value) =>
                updateField("recruiterPhone", value)
              }
              placeholder="+91 98765 43210"
            />
          </div>
        </section>

        {/* Social Links */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Social Links
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add your company's social media profiles.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="LinkedIn"
              icon={<BriefcaseBusiness size={18} />}
              value={profile.linkedin}
              onChange={(value) =>
                updateField("linkedin", value)
              }
              placeholder="https://linkedin.com/company/..."
            />

            <Input
              label="Twitter / X"
              value={profile.twitter}
              onChange={(value) =>
                updateField("twitter", value)
              }
              placeholder="https://x.com/..."
            />
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

/* -----------------------------
   Reusable Input
------------------------------ */

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  required = false,
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}

      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}

      <div className="relative mt-2">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          required={required}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-300 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </label>
  );
}

/* -----------------------------
   Reusable Select
------------------------------ */

function Select({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      >
        <option value="">Select company size</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default RecruiterProfilePage;