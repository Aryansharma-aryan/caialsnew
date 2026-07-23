import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/api";
import SEO from "../components/SEO/SEO";

const pageSize = 20;
const statusStyles = {
  new: "bg-blue-50 text-blue-700 ring-blue-100",
  in_review: "bg-amber-50 text-amber-700 ring-amber-100",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-100",
};

const formatBytes = (bytes = 0) => `${Math.max(1, bytes / 1024 / 1024).toFixed(bytes > 1024 * 1024 ? 1 : 2)} MB`;
const labelStatus = (status) => status === "in_review" ? "In review" : status === "completed" ? "Completed" : "New";

export default function AdminPanel() {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = () => localStorage.getItem("adminToken");
  const headers = () => ({ Authorization: `Bearer ${token()}` });

  const fetchCases = async (nextPage = page, nextSearch = search, nextStatus = status) => {
    if (!token()) { window.location.assign("/login"); return; }
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(nextPage) });
      if (nextSearch.trim()) params.set("search", nextSearch.trim());
      if (nextStatus !== "all") params.set("status", nextStatus);
      const { data } = await axios.get(`${API_BASE_URL}/getConsultation/paginated/list?${params}`, { headers: headers() });
      setCases(data.consultations);
      setTotal(data.totalConsultations);
      setPage(nextPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load consultation cases.");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchCases(1, "", "all"); }, []);

  const applyFilters = (event) => {
    event.preventDefault();
    fetchCases(1);
  };

  const downloadDocument = async (caseId, uploadedDocument) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getConsultation/${caseId}/documents/${uploadedDocument._id}/download`, { headers: headers(), responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = window.document.createElement("a");
      link.href = url; link.download = uploadedDocument.originalName || "document";
      window.document.body.appendChild(link); link.click(); link.remove(); window.URL.revokeObjectURL(url);
    } catch { toast.error("Could not download this document."); }
  };

  const saveCase = async () => {
    if (!selectedCase) return;
    setSaving(true);
    try {
      const { data } = await axios.put(`${API_BASE_URL}/getConsultation/${selectedCase._id}/case`, { caseStatus: selectedCase.caseStatus || "new", adminNotes: selectedCase.adminNotes || "" }, { headers: headers() });
      setCases((current) => current.map((item) => item._id === data._id ? data : item));
      setSelectedCase(data);
      toast.success("Case details saved.");
    } catch (error) { toast.error(error.response?.data?.message || "Could not save this case."); }
    finally { setSaving(false); }
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const counts = cases.reduce((summary, item) => ({ ...summary, [item.caseStatus || (item.isCompleted ? "completed" : "new")]: summary[item.caseStatus || (item.isCompleted ? "completed" : "new")] + 1 }), { new: 0, in_review: 0, completed: 0 });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <SEO title="Admin Cases | CAIALS" description="CAIALS administration dashboard." robots="noindex, nofollow" />
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] bg-slate-950 p-7 text-white sm:p-10"><p className="text-xs font-bold uppercase tracking-[.18em] text-red-300">CAIALS admin</p><div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h1 className="text-4xl font-bold">Consultation case desk</h1><p className="mt-3 max-w-2xl text-white/70">Review each client request, supporting documents, contact details, and follow-up notes in one place.</p></div><p className="rounded-full bg-white/10 px-5 py-3 text-sm font-bold">{total} case{total === 1 ? "" : "s"} found</p></div></header>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">{[["New", counts.new, "new"], ["In review", counts.in_review, "in_review"], ["Completed", counts.completed, "completed"]].map(([label, count, key]) => <button key={key} onClick={() => { setStatus(key); fetchCases(1, search, key); }} className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-red-200"><p className="text-sm font-semibold text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold text-slate-950">{count}</p></button>)}</section>

        <form onSubmit={applyFilters} className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, phone, service, or country" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100" />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-red-300"><option value="all">All statuses</option><option value="new">New</option><option value="in_review">In review</option><option value="completed">Completed</option></select>
          <button className="premium-button px-6 py-3 text-sm font-bold">Search cases</button>
        </form>

        <section className="mt-6 grid gap-4">
          {loading ? <div className="rounded-2xl bg-white p-10 text-center text-sm font-semibold text-slate-500">Loading cases…</div> : cases.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><h2 className="text-xl font-bold">No matching consultations</h2><p className="mt-2 text-sm text-slate-500">Try another filter or check back after a client submits the form.</p></div> : cases.map((caseItem) => {
            const currentStatus = caseItem.caseStatus || (caseItem.isCompleted ? "completed" : "new");
            return <article key={caseItem._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-200 sm:p-6"><div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-bold text-slate-950">{caseItem.fullName}</h2><span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusStyles[currentStatus]}`}>{labelStatus(currentStatus)}</span></div><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600"><span>{caseItem.visaType}</span><span>{caseItem.countryOfInterest}</span><a className="font-semibold text-red-700 hover:text-red-900" href={`mailto:${caseItem.email}`}>{caseItem.email}</a><a className="font-semibold text-red-700 hover:text-red-900" href={`tel:${caseItem.phone}`}>{caseItem.phone}</a></div><p className="mt-3 text-xs font-semibold text-slate-400">Received {moment(caseItem.createdAt).format("DD MMM YYYY, h:mm A")} · {caseItem.documents?.length || 0} document{caseItem.documents?.length === 1 ? "" : "s"}</p></div><button onClick={() => setSelectedCase({ ...caseItem, caseStatus: currentStatus })} className="soft-button shrink-0 px-5 py-3 text-sm font-bold">Open case →</button></div></article>;
          })}
        </section>

        {totalPages > 1 && <nav className="mt-8 flex items-center justify-center gap-4" aria-label="Case pagination"><button disabled={page === 1} onClick={() => fetchCases(page - 1)} className="soft-button px-5 py-2.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40">← Previous</button><span className="text-sm font-bold text-slate-600">Page {page} of {totalPages}</span><button disabled={page === totalPages} onClick={() => fetchCases(page + 1)} className="soft-button px-5 py-2.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40">Next →</button></nav>}
      </div>

      {selectedCase && <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-sm sm:p-8"><div className="mx-auto my-4 max-w-4xl rounded-[2rem] bg-white shadow-2xl"><div className="flex items-start justify-between border-b border-slate-100 p-6 sm:p-8"><div><p className="section-kicker">Case details</p><h2 className="mt-2 text-3xl font-bold text-slate-950">{selectedCase.fullName}</h2><p className="mt-2 text-sm text-slate-500">Received {moment(selectedCase.createdAt).format("DD MMM YYYY, h:mm A")}</p></div><button onClick={() => setSelectedCase(null)} className="rounded-full p-2 text-2xl text-slate-500 hover:bg-slate-100" aria-label="Close case">×</button></div><div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_.9fr]"><div><h3 className="text-lg font-bold">Client request</h3><dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">{[["Email", selectedCase.email], ["Phone", selectedCase.phone], ["Service", selectedCase.visaType], ["Country", selectedCase.countryOfInterest], ["Preferred contact", selectedCase.contactMethod], ["Preferred date", selectedCase.preferredDate || "Not provided"], ["Purpose", selectedCase.purpose || "Not provided"]].map(([label, value]) => <div key={label} className="rounded-xl bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt><dd className="mt-1 break-words font-semibold text-slate-800">{value}</dd></div>)}</dl><div className="mt-5 rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Client message</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{selectedCase.message || "No additional message."}</p></div><h3 className="mt-8 text-lg font-bold">Uploaded documents</h3><div className="mt-4 grid gap-3">{selectedCase.documents?.length ? selectedCase.documents.map((document) => <button key={document._id} onClick={() => downloadDocument(selectedCase._id, document)} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-red-200 hover:bg-red-50"><span className="min-w-0"><span className="block truncate font-bold text-slate-800">{document.originalName}</span><span className="mt-1 block text-xs text-slate-500">{document.mimeType} · {formatBytes(document.size)}</span></span><span className="shrink-0 text-sm font-bold text-red-700">Download</span></button>) : <p className="rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500">No documents were uploaded with this request.</p>}</div></div><aside className="rounded-2xl bg-slate-950 p-5 text-white"><h3 className="text-lg font-bold">Admin follow-up</h3><label className="mt-5 block text-sm font-semibold text-white/70">Case status<select value={selectedCase.caseStatus} onChange={(event) => setSelectedCase((current) => ({ ...current, caseStatus: event.target.value }))} className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white outline-none"><option className="text-slate-900" value="new">New</option><option className="text-slate-900" value="in_review">In review</option><option className="text-slate-900" value="completed">Completed</option></select></label><label className="mt-5 block text-sm font-semibold text-white/70">Private admin notes<textarea value={selectedCase.adminNotes || ""} onChange={(event) => setSelectedCase((current) => ({ ...current, adminNotes: event.target.value }))} maxLength="2000" placeholder="Add follow-up details, missing documents, or next steps…" className="mt-2 min-h-44 w-full rounded-xl border border-white/15 bg-white/10 p-3 text-sm leading-6 text-white outline-none placeholder:text-white/35" /></label><p className="mt-2 text-right text-xs text-white/45">{(selectedCase.adminNotes || "").length}/2000</p><button disabled={saving} onClick={saveCase} className="mt-5 w-full rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-red-50 disabled:opacity-60">{saving ? "Saving…" : "Save case updates"}</button></aside></div></div></div>}
    </main>
  );
}
