import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    jobId: {
      type: Number,
      unique: true,
      seq: { type: Number, default: 0 },
    },
    band: {
      type: String,
    },
    headcount: {
      type: Number,
    },
    currencyId: {
      type: mongoose.Schema.ObjectId,
    },
    departmentId: {
      type: mongoose.Schema.ObjectId,
    },
    businessId: {
      type: mongoose.Schema.ObjectId,
    },
    cityId: {
      type: mongoose.Schema.ObjectId,
    },
    stateId: {
      type: mongoose.Schema.ObjectId,
    },
    countryId: {
      type: mongoose.Schema.ObjectId,
    },
    profileId: {
      type: mongoose.Schema.ObjectId,
      ref: "Profile",
    },
    interviewRoundId: {
      type: mongoose.Schema.ObjectId,
      ref: "InterviewRound",
    },
    questionBankId: {
      type: mongoose.Schema.ObjectId,
    },
    roundId: {
      type: mongoose.Schema.ObjectId,
    },
    workShiftId: {
      type: mongoose.Schema.ObjectId,
    },
    workTypeId: {
      type: mongoose.Schema.ObjectId,
    },
    workStyleId: {
      type: mongoose.Schema.ObjectId,
    },
    eligibility: {
      type: String,
    },
    compensationId: {
      type: mongoose.Schema.ObjectId,
    },
    payRange: {
      from: {
        type: Number,
      },
      to: {
        type: Number,
      },
    },
    approver_1: {
      profileId: {
        type: mongoose.Schema.ObjectId,
      },
      approved_at: {
        type: Date,
      },
      remarks: {
        type: String,
      },
      tasks: [
        {
          type: String,
        },
      ],
      status: {
        type: String,
        enum: ["APPROVED", "PENDING", "DECLINED"],
        default: "PENDING",
      },
    },

    approver_2: {
      profileId: {
        type: mongoose.Schema.ObjectId,
      },
      approved_at: {
        type: Date,
      },
      remarks: {
        type: String,
      },
      tasks: [
        {
          type: String,
        },
      ],
      status: {
        type: String,
        enum: ["APPROVED", "PENDING", "DECLINED"],
        default: "PENDING",
      },
    },

    approver_3: {
      profileId: {
        type: mongoose.Schema.ObjectId,
      },
      approved_at: {
        type: Date,
      },
      remarks: {
        type: String,
      },
      tasks: [
        {
          type: String,
        },
      ],
      status: {
        type: String,
        enum: ["APPROVED", "PENDING", "DECLINED"],
        default: "PENDING",
      },
    },

    approver_4: {
      profileId: {
        type: mongoose.Schema.ObjectId,
      },
      approved_at: {
        type: Date,
      },
      remarks: {
        type: String,
      },
      tasks: [
        {
          type: String,
        },
      ],
      status: {
        type: String,
        enum: ["APPROVED", "PENDING", "DECLINED"],
        default: "PENDING",
      },
    },

    status: {
      type: String,
      enum: [
        "APPROVED1",
        "APPROVED2",
        "APPROVED3",
        "APPROVED",
        "PENDING",
        "DECLINED",
        "DECLINED1",
        "DECLINED2",
        "DECLINED3",
        "DECLINED4",
      ],
      default: "PENDING",
    },
    createdBy: {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    opportunityId: {
      type: String,
      default: null,
    },
    approvedBy: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

jobsSchema.pre("save", function (next) {
  // Only increment when the document is new
  if (this.isNew) {
    Jobs.count().then((res) => {
      this.jobId = res + 7000000; // Increment count

      next();
    });
  } else {
    next();
  }
});

const Jobs = mongoose.model("Jobs", jobsSchema);

export default Jobs;
