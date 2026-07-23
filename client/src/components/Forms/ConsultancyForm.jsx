import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../../config/api";
import SEO, { breadcrumbSchema } from "../SEO/SEO";
import { addressLine, businessName, phone, phoneHref } from "../../data/seoContent";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  countryOfInterest: "",
  visaType: "",
  contactMethod: "",
  preferredDate: "",
  purpose: "",
  message: "",
};

const visaTypes = [
  "Family Immigration",
  "Green Card Petition",
  "Citizenship Application",
  "Business Visa",
  "Visitor / Tourist Visa",
  "Student / Study Visa",
  "OCI Card",
  "Indian Passport Assistance",
  "India Visa",
  "Religious Visa",
  "UK Visa",
  "Canada Visa / Canada PR",
  "Other",
];

const countries = ["United States", "India", "Canada", "United Kingdom", "Australia", "Schengen / Europe", "Other"];
const acceptedDocumentTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const maxDocumentSize = 5 * 1024 * 1024;
const formatFileSize = (size) => `${(size / 1024 / 1024).toFixed(size > 1024 * 1024 ? 1 : 2)} MB`;

const fileToPayload = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve({
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        data: reader.result,
      });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function ConsultancyForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDocuments = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 8) {
      toast.error("Please select up to 8 documents.");
      event.target.value = "";
      return;
    }
    if (files.some((file) => !acceptedDocumentTypes.includes(file.type))) {
      toast.error("Only PDF, JPG, PNG, WEBP, DOC, and DOCX files are accepted.");
      event.target.value = "";
      return;
    }
    if (files.some((file) => file.size > maxDocumentSize)) {
      toast.error("Each document must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }
    setSelectedDocs(files);
  };

  const validateForm = () => {
    const { fullName, email, phone: phoneValue, countryOfInterest, visaType, contactMethod } = formData;
    if (!fullName || !email || !phoneValue || !countryOfInterest || !visaType || !contactMethod) {
      toast.error("Please fill all required fields.");
      return false;
    }
    if (!/^[A-Za-z\s.'-]+$/.test(fullName)) {
      toast.error("Full name contains invalid characters.");
      return false;
    }
    if (!/^\d{7,15}$/.test(phoneValue)) {
      toast.error("Phone number must be 7-15 digits.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Email is invalid.");
      return false;
    }
    if (selectedDocs.length > 8) {
      toast.error("Please upload up to 8 documents.");
      return false;
    }
    if (selectedDocs.some((file) => file.size > maxDocumentSize || !acceptedDocumentTypes.includes(file.type))) {
      toast.error("Each document must be 5 MB or smaller.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const documents = await Promise.all(selectedDocs.map(fileToPayload));
      const res = await axios.post(`${API_BASE_URL}/consult`, { ...formData, documents }, {
        headers: { "Content-Type": "application/json" },
        timeout: 30000,
      });
      toast.success(res.data?.message || "Consultation request submitted successfully.");
      setFormData(initialForm);
      setSelectedDocs([]);
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        toast.error("Server took too long to respond. Please try again later.");
      } else {
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100";

  return (
    <main className="premium-shell text-slate-900">
      <SEO
        title="Immigration Consultation Fremont CA | CAIALS"
        description="Request a consultation with CAIALS Immigration Services in Fremont, CA for family immigration, green card, student visa, OCI, Indian passport, India visa, UK visa, Canada visa, and Canada PR support."
        keywords="immigration consultation Fremont CA, visa consultant near Fremont, immigration services Fremont CA"
        schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Consultation", path: "/consultation" }])]}
      />
      <ToastContainer position="top-right" autoClose={3000} />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="section-kicker">Consultation</p>
          <h1 className="premium-title mt-4 text-5xl sm:text-6xl">Start with a clear immigration plan</h1>
          <p className="premium-text mt-6 text-lg">
            Tell CAIALS what you need help with. The team will review your request and help you
            understand the next documentation steps for your immigration or visa matter.
          </p>
          <div className="premium-card mt-8 rounded-[1.5rem] p-6">
            <h2 className="text-2xl font-bold text-slate-950">{businessName}</h2>
            <p className="premium-text mt-3">
              {addressLine}<br />
              <a className="text-red-700" href={phoneHref}>{phone}</a>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="premium-card rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className={fieldClass} type="text" name="fullName" placeholder="Full name *" value={formData.fullName} onChange={handleChange} required />
            <input className={fieldClass} type="email" name="email" placeholder="Email address *" value={formData.email} onChange={handleChange} required />
            <input className={fieldClass} type="tel" name="phone" placeholder="Phone number *" pattern="\d{7,15}" value={formData.phone} onChange={handleChange} required />
            <select className={fieldClass} name="countryOfInterest" value={formData.countryOfInterest} onChange={handleChange} required>
              <option value="">Country of interest *</option>
              {countries.map((country) => <option key={country} value={country}>{country}</option>)}
            </select>
            <select className={fieldClass} name="visaType" value={formData.visaType} onChange={handleChange} required>
              <option value="">Service needed *</option>
              {visaTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
            <select className={fieldClass} name="contactMethod" value={formData.contactMethod} onChange={handleChange} required>
              <option value="">Preferred contact method *</option>
              <option value="Phone">Phone</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
            </select>
            <input className={fieldClass} type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} />
            <input className={fieldClass} type="text" name="purpose" placeholder="Purpose of consultation" maxLength="200" value={formData.purpose} onChange={handleChange} />
          </div>
          <textarea className={`${fieldClass} mt-4 min-h-36`} name="message" placeholder="Additional message" maxLength="500" value={formData.message} onChange={handleChange} />
          <div className="mt-4 rounded-2xl border border-dashed border-red-200 bg-red-50/50 p-5">
            <label className="block cursor-pointer text-sm font-extrabold text-red-700">
              Supporting documents (optional)
              <span className="mt-1 block text-xs font-medium text-slate-500">
                PDF, JPG, PNG, WEBP, DOC, or DOCX. Upload up to 8 files, 5 MB each. Your files
                are stored with your case and are available only to the CAIALS admin team.
              </span>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                className="mt-4 block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-red-700"
                onChange={handleDocuments}
              />
            </label>
            {selectedDocs.length > 0 && (
              <ul className="mt-4 grid gap-2">
                {selectedDocs.map((file, index) => (
                  <li key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                    <span className="min-w-0 truncate">{file.name} <span className="ml-1 text-xs font-medium text-slate-400">({formatFileSize(file.size)})</span></span>
                    <button type="button" onClick={() => setSelectedDocs((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="shrink-0 text-xs font-bold text-red-700 hover:text-red-900">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit" disabled={loading} className="premium-button mt-5 w-full px-7 py-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Submitting..." : "Submit consultation request"}
          </button>
        </form>
      </section>
    </main>
  );
}
