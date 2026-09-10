import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Save,
  Upload,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const STORAGE_KEY = "jobhub_recruiter_profile";

const defaultProfile = {
  companyName: "",
  companyEmail: "",
  companyPhone: "",
  website: "",
  location: "",
  industry: "",
  companySize: "",
  foundedYear: "",
  description: "",
  linkedin: "",
  twitter: "",
  recruiterName: "",
  recruiterEmail: "",
  recruiterPhone: "",
  logo: "",
};

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setProfile({
          ...defaultProfile,
          ...JSON.parse(stored),
        });
      } else {
        setProfile((current) => ({
          ...current,
          recruiterName: user?.name || "",
          recruiterEmail: user?.email || "",
        }));
      }
    } catch {
      setProfile((current) => ({
        ...current,
        recruiterName: user?.name || "",
        recruiterEmail: user?.email || "",
      }));
    }
  }, [user]);

  const updateField = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const completion = useMemo(() => {
    const fields = [
      profile.companyName,
      profile.companyEmail,
      profile.companyPhone,
      profile.website,
      profile.location,
      profile.industry,
      profile.companySize,
      profile.foundedYear,
      profile.description,
      profile.recruiterName,
      profile.recruiterEmail,
      profile.recruiterPhone,
      profile.linkedin,
    ];

    const completed = fields.filter(
      (field) => String(field || "").trim().length > 0
    ).length;

    return Math.round((completed / fields.length) * 100);
  }, [profile]);

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Logo must be smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateField("logo", reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Company Profile
        </h2>

        <p className="mt-1 text-slate-500">
          Manage your company and recruiter information.
        </p>
      </div>

      {/* Completion */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-slate-900">
              Profile Completion
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Complete your profile to make your company more attractive to
              candidates.
            </p>
          </div>

          <span className="text-2xl font-bold text-blue-600">
            {completion}%
          </span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Logo */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Company Logo
          </h3>

          <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            {profile.logo ? (
              <img
                src={profile.logo}
                alt="Company logo"
                className="h-20 w-20 rounded-2xl border object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Building2 size={30} />
              </div>
            )}

            <div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                <Upload size={17} />
                Upload Logo

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>

              <p className="mt-2 text-xs text-slate-400">
                JPG, PNG or WEBP. Maximum 2 MB.
              </p>
            </div>
          </div>
        </section>

        {/* Company Information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Company Information
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Basic information about your organization.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Company Name"
              required
              icon={<Building2 size={18} />}
              value={profile.companyName}
              onChange={(value) => updateField("companyName", value)}
              placeholder="e.g. TechNova Solutions"
            />

            <InputField
              label="Company Email"
              type="email"
              icon={<Mail size={18} />}
              value={profile.companyEmail}
              onChange={(value) => updateField("companyEmail", value)}
              placeholder="hr@company.com"
            />

            <InputField
              label="Phone"
              icon={<Phone size={18} />}
              value={profile.companyPhone}
              onChange={(value) => updateField("companyPhone", value)}
              placeholder="+91 98765 43210"
            />

            <InputField
              label="Website"
              icon={<Globe size={18} />}
              value={profile.website}
              onChange={(value) => updateField("website", value)}
              placeholder="https://company.com"
            />

            <InputField
              label="Location"
              icon={<MapPin size={18} />}
              value={profile.location}
              onChange={(value) => updateField("location", value)}
              placeholder="Jaipur, Rajasthan"
            />

            <InputField
              label="Industry"
              icon={<Building2 size={18} />}
              value={profile.industry}
              onChange={(value) => updateField("industry", value)}
              placeholder="Information Technology"
            />

            <SelectField
              label="Company Size"
              value={profile.companySize}
              onChange={(value) => updateField("companySize", value)}
              options={[
                "1-10 employees",
                "11-50 employees",
                "51-200 employees",
                "201-500 employees",
                "501-1000 employees",
                "1000+ employees",
              ]}
            />

            <InputField
              label="Founded Year"
              type="number"
              value={profile.foundedYear}
              onChange={(value) => updateField("foundedYear", value)}
              placeholder="2020"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company Description
            </label>

            <textarea
              rows={6}
              value={profile.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Tell candidates about your company, culture, products and mission..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />

            <p className="mt-2 text-xs text-slate-400">
              {profile.description.length}/1000 characters
            </p>
          </div>
        </section>

        {/* Recruiter Information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Recruiter Information
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Information candidates can use to identify the recruiter.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Recruiter Name"
              required
              icon={<User size={18} />}
              value={profile.recruiterName}
              onChange={(value) => updateField("recruiterName", value)}
              placeholder="Your full name"
            />

            <InputField
              label="Recruiter Email"
              type="email"
              required
              icon={<Mail size={18} />}
              value={profile.recruiterEmail}
              onChange={(value) => updateField("recruiterEmail", value)}
              placeholder="recruiter@company.com"
            />

            <InputField
              label="Recruiter Phone"
              icon={<Phone size={18} />}
              value={profile.recruiterPhone}
              onChange={(value) => updateField("recruiterPhone", value)}
              placeholder="+91 98765 43210"
            />
          </div>
        </section>

        {/* Social Links */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Social Links
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Help candidates learn more about your company.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="LinkedIn"
              icon={<Linkedin size={18} />}
              value={profile.linkedin}
              onChange={(value) => updateField("linkedin", value)}
              placeholder="https://linkedin.com/company/..."
            />

            <InputField
              label="Twitter / X"
              value={profile.twitter}
              onChange={(value) => updateField("twitter", value)}
              placeholder="https://x.com/..."
            />
          </div>
        </section>

        {/* Save */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>

        {saved && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            ✓ Company profile saved successfully.
          </div>
        )}
      </form>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  icon,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-200 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      >
        <option value="">Select company size</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
