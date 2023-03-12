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
        roundNumber: {
          type: Number,
        },
        marksObtained: {
          type: Number,
        },
        roundId: {
          type: mongoose.Types.ObjectId,
          ref: "Round",
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
    totalRound: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        "APPLIED",
        "EXAM-COMPLETED",
        "INTERVIEWED",
        "EXAM-PASSED",
        "ALL-ROUND-PASSED",
        "NOT-APPLIED",
      ],
      default: "NOT-APPLIED",
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;
