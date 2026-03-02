import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://caials-ebon.onrender.com/api";

const AdminPanel = () => {
  const [queries, setQueries] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 50; // Items per page

  // Fetch paginated consultations
  const fetchQueries = async (currentPage = 1) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("No admin token found. Redirecting...");
        window.location.href = "/login";
        return;
      }

      const res = await axios.get(
        `${API_URL}/getConsultation/paginated/list?page=${currentPage}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQueries(res.data.consultations);
      setTotal(res.data.totalConsultations);
      setPage(currentPage);
    } catch (err) {
      console.error("Failed to fetch consultations:", err);
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // Toggle completion status
  const toggleCompletion = async (id, current) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API_URL}/getConsultation/${id}/complete`,
        { isCompleted: !current },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status updated!");
      fetchQueries(page);
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update");
    }
  };

  // Delete single consultation
  const deleteById = async (id) => {
    if (!window.confirm("Are you sure you want to delete this consultation?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/getConsultation/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Consultation deleted successfully!");
      fetchQueries(page);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting consultation");
    }
  };

  // Clear all consultations
  const clearAll = async () => {
    if (!window.confirm("⚠️ Are you sure? This will delete ALL consultations permanently!")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/getConsultation`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("All consultations cleared!");
      fetchQueries(1);
    } catch (err) {
      console.error("Clear all error:", err);
      toast.error("Failed to clear consultations");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/30 p-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-indigo-900 drop-shadow-sm">
            Hi Rosy 👋
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Here are all the consultation queries from your clients
          </p>
        </div>

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-indigo-700">
            Total Consultations: {total}
          </h2>
          <button
            onClick={clearAll}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-lg font-medium transition"
          >
            🗑️ Clear All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-indigo-600 text-white text-xs uppercase tracking-wide">
              <tr>
                <th className="px-3 py-3">#</th>
                <th className="px-3 py-3">Full Name</th>
                <th className="px-3 py-3">Phone</th>
                <th className="px-3 py-3">Visa</th>
                <th className="px-3 py-3">Country</th>
                <th className="px-3 py-3">Submitted</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queries.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-gray-500">
                    No consultations found 😴
                  </td>
                </tr>
              ) : (
                queries.map((q, index) => (
                  <tr
                    key={q._id}
                    className={`transition duration-300 ${
                      q.isCompleted
                        ? "bg-green-50 hover:bg-green-100"
                        : index % 2 === 0
                        ? "bg-white hover:bg-indigo-50"
                        : "bg-gray-50 hover:bg-indigo-50"
                    }`}
                  >
                    <td className="px-3 py-2 font-semibold text-gray-500">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="px-3 py-2 font-medium">{q.fullName}</td>
                    <td className="px-3 py-2">{q.phone}</td>
                    <td className="px-3 py-2">{q.visaType}</td>
                    <td className="px-3 py-2">{q.countryOfInterest}</td>
                    <td className="px-3 py-2 text-sm text-gray-500">
                      {moment(q.createdAt).format("DD MMM YYYY, h:mm A")}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          q.isCompleted
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {q.isCompleted ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center space-x-2">
                      <button
                        onClick={() => toggleCompletion(q._id, q.isCompleted)}
                        className={`text-white text-xs px-3 py-1 rounded-lg transition ${
                          q.isCompleted
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {q.isCompleted ? "Undo" : "Mark Done"}
                      </button>
                      <button
                        onClick={() => deleteById(q._id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 space-x-4">
            <button
              onClick={() => fetchQueries(page - 1)}
              disabled={page === 1}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border font-medium transition ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              ← Prev
            </button>
            <span className="font-semibold text-indigo-800 text-lg">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => fetchQueries(page + 1)}
              disabled={page === totalPages}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border font-medium transition ${
                page === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Next → 
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPanel;
