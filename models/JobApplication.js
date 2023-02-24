import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.ObjectId,
    },
    jobId: {
      type: mongoose.Schema.ObjectId,
    },
    jobSeekerId: {
      type: mongoose.Schema.ObjectId,
    },
    interviewer: {
      type: mongoose.Schema.ObjectId,
    },
    applyDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);

export default JobApplication;
