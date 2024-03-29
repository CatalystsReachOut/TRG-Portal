// import JobApplication from "../models/JobApplication.js";
import JobApplication from "../models/JobApplication.js";
import bigPromise from "../middlewares/bigPromise.js";
import Jobs from "../models/Job.js";
import InterviewRound from "../models/headers/interviewRounds.js";
import Round from "../models/headers/rounds.js";
import QuestionBank from "../models/headers/questionBank.js";
import JobSeeker from "../models/Jobseeker.js";

function makeId(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const jobApplication = bigPromise(async (req, res, next) => {
  const jobId = req.params.jobId;
  // console.log(req.user);
  const jobSeekerId = req.user.id;
  // console.log(jobId);
  const applicationId = makeId(3);

  const ap = await Jobs.findOne({ _id: jobId }).select("profileId");
  // console.log(ap);

  const rounds = await InterviewRound.findOne({
    profile: ap.profileId,
  }).select("rounds");

  const toStore = {
    jobId,
    jobSeekerId,
    applicationId,
    status: "APPLIED",
    totalRound: rounds.rounds.length,
  };


  console.log(toStore);
  const jobSeeker = await JobApplication.findOne({ jobSeekerId, jobId })
    .lean()
    .catch((err) => {
      console.log(`error getting job application=> ${err}`);
      return null;
    });

  if (jobSeeker) {
    return res.status(400).json({
      success: false,
      message: "You've already applied for this job.",
    });
  }

  console.log(jobSeeker);
  const jobApplication = await JobApplication.create(toStore).catch((err) => {
    console.log(`error applying job => ${err}`);
    return null;
  });

  console.log(jobApplication);

  if (jobApplication === null) {
    return res.status(400).json({
      success: false,
      message: "Failed to apply for job.",
    });
  }

  // const newData = {
  //   applicationId: jobApplication._id,
  // };

  // console.log(jobApplication);
  // const user = await JobSeeker.findByIdAndUpdate(
  //   jobSeekerId,
  //   { $push: { appliedJobs: newData } },
  //   { new: true }
  // )
  //   .lean()
  //   .catch((err) => {
  //     console.log(`error updating jobseeker=> ${err}`);
  //     return null;
  //   });

  return res.status(200).json({
    success: true,
    message: "Successfully Applied for Job!",
    data: jobApplication,
  });
});

export const getQuestionsJobId = bigPromise(async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const job = await Jobs.findOne({ _id: jobId });
    const questionsRoundWise = [];
    // console.log(req.user);

    const applicationId = await JobApplication.find(
      {
        jobId,
        jobSeekerId: req.user._id,
      },
      "_id"
    );

    const interviewRound = await InterviewRound.find({
      profile: job.profileId,
    });
    console.log(interviewRound);

    for (let k = 0; k < interviewRound.length; k++) {
      for (let i = 0; i < interviewRound[k].rounds.length; i++) {
        const questionsIds = interviewRound[k].rounds[i].question;
        const roundName = await Round.findOne(
          { _id: interviewRound[k].rounds[i].round },
          "name"
        );
        console.log(questionsIds);

        const totalMarks = interviewRound[k].rounds[i].totalMarks;
        console.log(totalMarks);

        const totalTime = interviewRound[k].rounds[i].time;

        const questions = await QuestionBank.find({
          name: { $in: questionsIds },
        })
          .lean()
          .catch((err) => {
            console.log(`error getting question => ${err}`);
          });
        // console.log(questions);
        questionsRoundWise.push({
          round: roundName,
          questions: questions,
          totalMarks: totalMarks,
          totalTime: totalTime,
          applicationId: applicationId[0]._id,
        });
      }
    }

    if (questionsRoundWise.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No rounds available.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Round Wise Question",
      data: questionsRoundWise,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export const getAllApplicant = bigPromise(async (req, res, next) => {
  try {
    const { jobId } = req.query;
    var condition = {};

    if (jobId) {
      condition = {
        jobId: req.query.jobId,
      };
    }
    // console.log(condition);

    const jobApplications = await JobApplication.find(condition)
      .populate({
        path: "jobId",
        select: "profileId",
        populate: { path: "profileId", select: "title" },
      })
      .populate("jobSeekerId", "fullName")
      .populate("interviewer", "title")
      .select("applicationId applyDate roundWiseStats")
      .exec();

    const applicants = jobApplications.map((jobApplication) => {
      return {
        jobProfileName: jobApplication.jobId.profileId.title,
        applicantName: jobApplication.jobSeekerId.fullName,
        applyDate: jobApplication.applyDate,
        _id: jobApplication._id,
        jobId: jobApplication.jobId._id,
        jobSeekerId: jobApplication.jobSeekerId._id,
        roundWiseStats: jobApplication.roundWiseStats,
        interviewer: jobApplication.interviewer,
        applicationId: jobApplication.applicationId,
      };
    });
    // console.log(applicants);

    return res.status(200).json({
      success: true,
      message: "All Applicants",
      data: applicants,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getApplicantJobs = bigPromise(async (req, res) => {
  const jobSeekerId = req.user.id;

  const applications = await JobApplication.find({ jobSeekerId }).populate({
    path: "jobId",
    select: "profileId",
  });

  const data = applications.map((app) => {
    const currentRound = app.roundWiseStats
      .filter((round) => round.status === "PASSED")
      .sort((a, b) => b.roundId - a.roundId)[0];

    // console.log(app.jobId.profileId);
    const nextRound = InterviewRound.findOne({
      profile: app.jobId.profileId,
    })
      .lean()
      .catch((err) => {
        console.log(`error getting interview round ::${err}`);
        return null;
      });

    // console.log(nextRound);
    return {
      applicationId: app.applicationId,
      _id: app._id,
      jobTitle: app.jobId.title,
      jobId: app.jobId._id,
      interviewer: app.interviewer,
      roundWiseStats: app.roundWiseStats,
      applyDate: app.applyDate,
      status: app.status,
      currentRound: currentRound || null,
      nextRound: nextRound || null,
    };
  });

  res.status(200).json({
    success: true,
    data: data,
  });
});

export const updateApplicant = bigPromise(async (req, res, next) => {
  const newData = {
    jobId: req.body.jobId,
    jobSeekerId: req.body.jobSeekerId,
    interviewer: req.body.interviewer,
  };

  const updatedApplicant = await JobApplication.findByIdAndUpdate(
    req.params.id,
    newData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  ).catch((err) => {
    console.log(`error updating applicant :: ${err}`);
    return null;
  });

  if (updatedApplicant === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Updated Applicant!",
    data: updatedApplicant,
  });
});
