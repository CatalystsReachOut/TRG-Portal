import JobApplication from "../models/JobApplication.js";
import bigPromise from "../middlewares/bigPromise.js";
import Jobs from "../models/Job.js";
import InterviewRound from "../models/headers/interviewRounds.js";
import Round from "../models/headers/rounds.js";
import QuestionBank from "../models/headers/questionBank.js";

export const jobApplication = bigPromise(async (req, res, next) => {
  const jobId = req.params.jobId;
  console.log(req.user);
  const jobSeekerId = req.user.id;
  console.log(jobId);
  const toStore = {
    jobId,
    jobSeekerId,
  };
  //   console.log(jobSeekerId);
  //   console.log(req.params);
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
  const jobApplication = await JobApplication.create(toStore).catch((err) => {
    console.log(`error applying job => ${err}`);
    return null;
  });

  if (jobApplication === null) {
    return res.status(400).json({
      success: false,
      message: "Failed to apply for job.",
    });
  }

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

    const interviewRound = await InterviewRound.findOne({
      profileId: job.profileId,
    });

    for (let i = 0; i < interviewRound.rounds.length; i++) {
      const questionsIds = interviewRound.rounds[i].question;
      const roundName = await Round.findOne(
        { _id: interviewRound.rounds[i].round },
        "name"
      );
      // console.log(questionsIds);

      const questions = await QuestionBank.find({
        name: { $in: questionsIds },
      })
        .lean()
        .catch((err) => {
          console.log(`error getting question => ${err}`);
        });
      // console.log(questions);
      questionsRoundWise.push({ round: roundName, questions: questions });
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
  const allApplicants = await JobApplication.find({}).catch((err) => {
    console.log(`error getting applicants :: ${err}`);
    return null;
  });

  if (allApplicants === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server error !",
    });
  }

  res.status(201).json({
    success: true,
    message: "All Applicants!",
    data: allApplicants,
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
