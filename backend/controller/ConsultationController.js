// controllers/consultController.js

const { body, validationResult } = require("express-validator");
const Consultation = require("../models/Consultation");
const { Resend } = require("resend");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();

// ------------------------------------------------------
// 🚀 Initialize Resend API
// ------------------------------------------------------
const resend = new Resend(process.env.RESEND_API_KEY);
// Configure ADMIN_RECIPIENTS as a comma-separated list to notify every team member.
// ADMIN_RECIPIENT remains supported for existing deployments.
const notificationRecipients = (process.env.ADMIN_RECIPIENTS || process.env.ADMIN_RECIPIENT || "")
  .split(",")
  .map((recipient) => recipient.trim())
  .filter(Boolean);

const uploadRoot = path.join(__dirname, "..", "uploads", "consultations");
const allowedMimeTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const maxDocuments = 8;
const maxDocumentSize = 5 * 1024 * 1024;

const sanitizeFileName = (name = "document") =>
  name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);

const validateUploadedDocuments = (documents) => {
  if (documents === undefined || documents === null) return null;
  if (!Array.isArray(documents)) return "Documents must be sent as a list.";
  if (documents.length > maxDocuments) return `Upload up to ${maxDocuments} documents.`;

  for (const document of documents) {
    if (!document?.originalName || !document?.mimeType || !document?.data) {
      return "Each document must include a name, type, and file data.";
    }
    if (!allowedMimeTypes.has(document.mimeType)) {
      return "Only PDF, JPG, PNG, WEBP, DOC, and DOCX documents are accepted.";
    }
    const match = String(document.data).match(/^data:[^;]+;base64,([A-Za-z0-9+/=\s]+)$/);
    if (!match) return `Invalid upload format for ${document.originalName}.`;
    const size = Buffer.from(match[1], "base64").length;
    if (!size || size > maxDocumentSize) return `${document.originalName} must be 5 MB or smaller.`;
  }
  return null;
};

const saveConsultationDocuments = async (consultationId, documents = []) => {
  if (!Array.isArray(documents) || documents.length === 0) return [];

  const targetDir = path.join(uploadRoot, String(consultationId));
  await fs.mkdir(targetDir, { recursive: true });

  const saved = [];
  for (const [index, doc] of documents.slice(0, maxDocuments).entries()) {
    const buffer = Buffer.from(String(doc.data).split(",").pop(), "base64");

    const originalName = sanitizeFileName(doc.originalName);
    const filename = `${Date.now()}-${index}-${originalName}`;
    await fs.writeFile(path.join(targetDir, filename), buffer);

    saved.push({
      originalName,
      filename,
      mimeType: doc.mimeType,
      size: buffer.length,
      relativePath: path.join(String(consultationId), filename),
    });
  }

  return saved;
};

  //  📧 EMAIL TEMPLATE (HTML)
const buildConsultationHtml = (consult) => `
  <div style="font-family: 'Arial', sans-serif; background-color:#f9f9f9; padding:30px;">
    <div style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:10px; box-shadow:0 4px 15px rgba(0,0,0,0.1); overflow:hidden;">
      
      <!-- Personalized Greeting Header -->
      <div style="background-color:#4a90e2; color:#ffffff; padding:20px; text-align:center;">
        <h2 style="margin:0; font-size:20px;">Hello Rosy Mam,</h2>
        <p style="margin:5px 0 0; font-size:16px;">Here is your new consultation request</p>
      </div>
      
      <!-- Consultation Details Table -->
      <table cellpadding="10" cellspacing="0" style="width:100%; border-collapse:collapse; font-size:14px; color:#333;">
        <tr style="background-color:#f0f4f8;"><td style="font-weight:bold; width:40%;">Name:</td><td>${consult.fullName}</td></tr>
        <tr><td style="font-weight:bold; background-color:#f0f4f8;">Email:</td><td>${consult.email}</td></tr>
        <tr><td style="font-weight:bold;">Phone:</td><td>${consult.phone}</td></tr>
        <tr style="background-color:#f0f4f8;"><td style="font-weight:bold;">Country of Interest:</td><td>${consult.countryOfInterest}</td></tr>
        <tr><td style="font-weight:bold; background-color:#f0f4f8;">Visa Type:</td><td>${consult.visaType}</td></tr>
        <tr><td style="font-weight:bold;">Contact Method:</td><td>${consult.contactMethod}</td></tr>
        <tr style="background-color:#f0f4f8;"><td style="font-weight:bold;">Preferred Date:</td><td>${consult.preferredDate || "Not provided"}</td></tr>
        <tr><td style="font-weight:bold;">Purpose:</td><td>${consult.purpose || "Not provided"}</td></tr>
        <tr style="background-color:#f0f4f8;"><td style="font-weight:bold;">Message:</td><td>${consult.message || "Not provided"}</td></tr>
        <tr><td style="font-weight:bold;">Submitted At:</td><td>${new Date(consult.createdAt).toLocaleString()}</td></tr>
      </table>
      
      <!-- Footer -->
      <div style="text-align:center; padding:15px; background-color:#f7f7f7; color:#777; font-size:12px;">
        — CAIALS System
      </div>
      
    </div>
  </div>
`;

/* -------------------------------------------------------
   🧾 VALIDATION RULES
---------------------------------------------------------- */
const validateConsultation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .matches(/^[A-Za-z\s.'-]+$/)
    .withMessage("Full name contains invalid characters."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address.")
    .normalizeEmail(),
  body("phone")
    .trim()
    .isNumeric()
    .withMessage("Phone must contain only numbers.")
    .isLength({ min: 7, max: 15 })
    .withMessage("Phone number must be 7–15 digits."),
  body("countryOfInterest").trim().notEmpty().withMessage("Country is required."),
  body("visaType").trim().notEmpty().withMessage("Visa type is required."),
  body("contactMethod")
    .trim()
    .notEmpty()
    .isIn(["Email", "Phone", "WhatsApp"])
    .withMessage("Invalid contact method."),
 body("preferredDate")
  .optional({ checkFalsy: true })
  .isISO8601()
  .withMessage("Preferred date must be valid (YYYY-MM-DD).")
  .custom((value) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time
    const selectedDate = new Date(value);
    if (selectedDate < today) {
      throw new Error("Preferred date cannot be in the past.");
    }
    return true;
  }),

  body("purpose")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
    .withMessage("Purpose too long (max 200 chars)."),
  body("message")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Message too long (max 500 chars)."),
  body("documents").optional().custom((documents) => {
    const message = validateUploadedDocuments(documents);
    if (message) throw new Error(message);
    return true;
  }),
];
const createConsultation = async (req, res) => {
  console.log("📨 Incoming request body:", req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { documents: incomingDocuments, ...consultationFields } = req.body;
    const newConsultation = await Consultation.create(consultationFields);
    const savedDocuments = await saveConsultationDocuments(newConsultation._id, incomingDocuments);

    if (savedDocuments.length) {
      newConsultation.documents = savedDocuments;
      await newConsultation.save();
    }
    console.log("✅ Consultation saved:", newConsultation);

    try {
      if (!notificationRecipients.length) {
        console.warn("No ADMIN_RECIPIENTS or ADMIN_RECIPIENT configured; consultation email was not sent.");
      } else {
      const emailResponse = await resend.emails.send({
        from: "CAIALS <onboarding@caials.in>",  // must be verified
        to: notificationRecipients,
        subject: `📩 New Consultation from ${newConsultation.fullName}`,
        html: buildConsultationHtml(newConsultation),
        reply_to: newConsultation.email,
      });

      console.log("✅ Email sent response:", emailResponse);
      }

    } catch (emailErr) {
      console.error("❌ Email send error:", emailErr); // <-- full error object
    }

    res.status(201).json({
      success: true,
      message: "Your consultation has been submitted successfully.",
    });

  } catch (err) {
    console.error("❌ Backend error:", err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};
/* -------------------------------------------------------
   📚 OTHER CONTROLLERS
---------------------------------------------------------- */
const getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(consultations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve consultations" });
  }
};

const markConsultationCompleted = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      {
        isCompleted: Boolean(req.body.isCompleted),
        caseStatus: req.body.isCompleted ? "completed" : "in_review",
      },
      { new: true }
    );
    if (!consultation)
      return res.status(404).json({ message: "Consultation not found" });
    res.status(200).json(consultation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const pendingBadge = async (req, res) => {
  try {
    const count = await Consultation.countDocuments({ isCompleted: false });
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get count" });
  }
};

const cleanupOldConsultations = async (req, res) => {
  try {
    const result = await Consultation.updateMany(
      { isCompleted: { $exists: false } },
      { $set: { isCompleted: false } }
    );
    res.json({ updated: result.modifiedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cleanup failed" });
  }
};

const deleteConsultationById = async (req, res) => {
  try {
    const deleted = await Consultation.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Consultation not found" });
    await fs.rm(path.join(uploadRoot, String(req.params.id)), { recursive: true, force: true });
    res.json({ message: "Consultation deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete consultation" });
  }
};

const clearAllConsultations = async (req, res) => {
  try {
    const result = await Consultation.deleteMany({});
    await fs.rm(uploadRoot, { recursive: true, force: true });
    res.json({
      message: "All consultations deleted successfully.",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to clear consultations" });
  }
};

const getConsultationsPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const search = String(req.query.search || "").trim();
    const filter = {};

    if (["new", "in_review", "completed"].includes(status)) filter.caseStatus = status;
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(escaped, "i");
      filter.$or = [
        { fullName: pattern }, { email: pattern }, { phone: pattern },
        { visaType: pattern }, { countryOfInterest: pattern },
      ];
    }

    const [consultations, total] = await Promise.all([
      Consultation.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Consultation.countDocuments(filter),
    ]);

    res.json({
      consultations,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalConsultations: total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch paginated consultations" });
  }
};

const updateConsultationCase = async (req, res) => {
  try {
    const { caseStatus, adminNotes = "" } = req.body;
    if (!["new", "in_review", "completed"].includes(caseStatus)) {
      return res.status(400).json({ message: "Invalid case status." });
    }
    if (typeof adminNotes !== "string" || adminNotes.length > 2000) {
      return res.status(400).json({ message: "Admin notes must be 2,000 characters or fewer." });
    }
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { caseStatus, adminNotes: adminNotes.trim(), isCompleted: caseStatus === "completed" },
      { new: true, runValidators: true }
    );
    if (!consultation) return res.status(404).json({ message: "Consultation not found." });
    return res.json(consultation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update consultation." });
  }
};

const downloadConsultationDocument = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id).lean();
    if (!consultation) {
      return res.status(404).json({ message: "Consultation not found" });
    }

    const document = consultation.documents?.find(
      (doc) => doc._id.toString() === req.params.documentId
    );
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    const fullPath = path.resolve(uploadRoot, document.relativePath);
    if (!fullPath.startsWith(path.resolve(uploadRoot))) {
      return res.status(400).json({ message: "Invalid file path" });
    }

    return res.download(fullPath, document.originalName);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to download document" });
  }
};

/* -------------------------------------------------------
   📦 EXPORT MODULES
---------------------------------------------------------- */
module.exports = {
  validateConsultation,
  createConsultation,
  getAllConsultations,
  markConsultationCompleted,
  pendingBadge,
  cleanupOldConsultations,
  deleteConsultationById,
  clearAllConsultations,
  getConsultationsPaginated,
  downloadConsultationDocument,
  updateConsultationCase,
};
