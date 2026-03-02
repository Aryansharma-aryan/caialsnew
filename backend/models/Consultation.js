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
  isCompleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); // ✅ createdAt added

module.exports = mongoose.model('Consultation', ConsultationSchema);
