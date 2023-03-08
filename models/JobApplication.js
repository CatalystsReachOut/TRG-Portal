import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.ObjectId,
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
      type: mongoose.Schema.ObjectId,
      ref: "Profile",
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
      enum: ["ACTIVE", "INACTIVE", "DELETED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;
