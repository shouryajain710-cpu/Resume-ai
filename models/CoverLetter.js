import mongoose from "mongoose";

const CoverLetterSchema = new mongoose.Schema({
  role: String,
  resumeText: String,
  result: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CoverLetter ||
  mongoose.model("CoverLetter", CoverLetterSchema);