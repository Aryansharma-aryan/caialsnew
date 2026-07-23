const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  countryOfInterest: String,
  visaType: String,
  contactMethod: String,
  preferredDate: String,
  purpose: String,
  message: String,
  documents: [
    {
      originalName: String,
      filename: String,
      mimeType: String,
      size: Number,
      relativePath: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isCompleted: {
    type: Boolean,
    default: false,
  },
  caseStatus: {
    type: String,
    enum: ["new", "in_review", "completed"],
    default: "new",
  },
  adminNotes: {
    type: String,
    default: "",
    maxlength: 2000,
  },
}, { timestamps: true }); // ✅ createdAt added

module.exports = mongoose.model('Consultation', ConsultationSchema);
