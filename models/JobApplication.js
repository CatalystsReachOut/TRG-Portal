import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
    },
    jobId: {
      type: mongoose.Schema.ObjectId,
      ref: "Jobs",
    },
    jobSeekerId: {
      type: mongoose.Schema.ObjectId,
      ref: "JobSeeker",
    },
    interviewer: {
      type: String,
    },
    applyDate: {
      type: Date,
      default: Date.now(),
    },
    roundWiseStats: [
      {
        marksObtained: {
          type: Number,
        },
        roundId: {
          type: mongoose.Types.ObjectId,
          ref: "Round",
          uniques: true,
        },
        roundName: {
          type: String,
        },
        status: {
          type: String,
          enum: ["PASSED", "FAILED"],
        },
      },
    ],
    status: {
      type: String,
      enum: ["APPLIED", "EXAM-COMPLETED", "INTERVIEWED", "EXAM-PASSED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;
