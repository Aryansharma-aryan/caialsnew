const express = require('express');
const router = express.Router();

const {
  createConsultation,
  
  getAllConsultations,
  markConsultationCompleted,
  pendingBadge,
  cleanupOldConsultations,
  deleteConsultationById,
  clearAllConsultations,
  getConsultationsPaginated,
  downloadConsultationDocument,
  validateConsultation,
  updateConsultationCase
} = require('../controller/ConsultationController');

const { loginAdmin, verifyAdmin } = require('../controller/AdminController');

// 🔐 Admin login route
router.post('/admin/login', loginAdmin);

// 💬 Consultation routes
router.post('/consult',validateConsultation, createConsultation);

// 🧾 Fetch all consultations (admin-protected)
router.get('/getConsultation', verifyAdmin, getAllConsultations);

// ✅ Mark consultation as completed
router.put('/getConsultation/:id/complete', verifyAdmin, markConsultationCompleted);
router.put('/getConsultation/:id/case', verifyAdmin, updateConsultationCase);

// 🔢 Pending count
router.get('/getConsultation/pendingCount', verifyAdmin, pendingBadge);

// 🧹 Cleanup old consultations
router.get('/getConsultation/cleanupOld', verifyAdmin, cleanupOldConsultations);

// 🆕 New routes below
// 🔹 Paginated list (20 per page)
router.get('/getConsultation/paginated/list', verifyAdmin, getConsultationsPaginated);

router.get('/getConsultation/:id/documents/:documentId/download', verifyAdmin, downloadConsultationDocument);

// 🔹 Delete by ID
router.delete('/getConsultation/:id', verifyAdmin, deleteConsultationById);

// 🔹 Clear all consultations
router.delete('/getConsultation', verifyAdmin, clearAllConsultations);

module.exports = router;
