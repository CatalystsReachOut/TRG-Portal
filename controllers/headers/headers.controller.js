// Models
import Business from "../../models/headers/business.js";
import City from "../../models/headers/cities.js";
import Country from "../../models/headers/country.js";
import Department from "../../models/headers/department.js";
import InterviewRound from "../../models/headers/interviewRounds.js";
import QuestionBank from "../../models/headers/questionBank.js";
import Round from "../../models/headers/rounds.js";
import State from "../../models/headers/states.js";
import Profile from "../../models/headers/profile.js";
import { isEmpty } from "../../utils/isEmpty.js";
import bigPromise from "../../middlewares/bigPromise.js";
import Employee from "../../models/Employee.js";

import { WhereClause } from "../../utils/whereClause.js";
import JobDescription from "../../models/headers/jobDescription.js";
import WorkShift from "../../models/headers/workShift.js";
import WorkStyle from "../../models/headers/workStyle.js";
import WorkType from "../../models/headers/workType.js";
import Band from "../../models/headers/band.js";
import Compensation from "../../models/headers/compensation.js";
import Currency from "../../models/headers/currency.js";

// Business Header

export const addBusiness = bigPromise(async (req, res, next) => {
  const { name, address, url, code, summary, logo, description, status } =
    req.body;

  if (!name || !address) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const business = await Business.create({
    name,
    address,
    url,
    code,
    summary,
    logo,
    description,
    status,
  }).catch((err) => {
    console.log(`error creating business :: ${err}`);
    return null;
  });

  if (business === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Business Added Successfully!",
    data: business,
  });
});

export const getAllBusiness = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
  };
  const allBusiness = await Business.find(condition).catch((err) => {
    console.log(`error getting business :: ${err}`);
    return null;
  });

  if (allBusiness === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server error !",
    });
  }

  res.status(201).json({
    success: true,
    data: allBusiness,
  });
});

export const updateBusinessById = bigPromise(async (req, res, next) => {
  console.log(isEmpty(req.body));
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    name: req.body.name,
    address: req.body.address,
    url: req.body.url,
    code: req.body.code,
    summary: req.body.summary,
    logo: req.body.logo,
    description: req.body.description,
    status: req.body.status,
  };

  const business = await Business.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating business :: ${err}`);
    return null;
  });

  if (business === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: business,
  });
});

// Cities Header

export const addCity = bigPromise(async (req, res, next) => {
  const { name, state, country, status } = req.body;

  if (!name || !state || !country) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const city = await City.create({
    name,
    state,
    country,
    status,
  }).catch((err) => {
    console.log(`error creating cities :: ${city}`);
    return null;
  });

  if (city === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "City Added Successfully!",
    data: city,
  });
});

export const getAllCity = bigPromise(async (req, res, next) => {
  const state = req.query.state;
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
    state: state,
  };

  const cities = await City.find(condition)
    .where(condition)
    .lean()
    .catch((err) => {
      console.log(`error getting city by state id :: ${err}`);
      return null;
    });

  if (cities === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error !",
    });
  }

  res.status(201).json({
    success: true,
    data: cities,
  });
});

export const updateCityById = bigPromise(async (req, res, next) => {
  console.log(isEmpty(req.body));
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    name: req.body.name,
    state: req.body.state,
    country: req.body.country,
    status: req.body.status,
  };
  const city = await City.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating city :: ${err}`);
    return null;
  });

  if (city === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server error",
    });
  }

  res.status(201).json({
    success: true,
    data: city,
  });
});

// Country Header

export const addCountry = bigPromise(async (req, res, next) => {
  const { name, code, status } = req.body;

  if (!name || !code) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const country = await Country.create({
    name,
    code,
    status,
  }).catch((err) => {
    console.log(`error creating country ${err}`);
    return null;
  });

  if (country === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Country Added Successfully!",
    data: country,
  });
});

export const getAllCountry = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
  };
  const allCountry = await Country.find(condition)
    .lean()
    .catch((err) => {
      console.log(`error getting country :: ${err}`);
      return null;
    });

  if (allCountry === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server error !",
    });
  }

  return res.status(201).json({
    success: true,
    data: allCountry,
  });
});

export const updateCountryById = bigPromise(async (req, res, next) => {
  // console.log(isEmpty(req.body))
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    name: req.body.name,
    code: req.body.code,
    status: req.body.status,
  };
  const country = await Country.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating country ${err}`);
    return null;
  });

  if (country === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: country,
  });
});

// Interview Round

export const addInterviewRound = bigPromise(async (req, res, next) => {
  const { profile, noOfRound, noOfQuestion, rounds, status } = req.body;

  if (!profile) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }
  var sQuest = {};
  sQuest.a = 0;
  for (let i = 0; i < rounds.length; i++) {
    if (rounds[i].roundName || rounds[i].question) {
      console.log(rounds[i].question);
      var allSubjectiveQuestions = await QuestionBank.find({
        _id: {
          $in: rounds[i].question,
        },
        questionType: "Subjective",
      });
      rounds[i].subjectiveQuestion = allSubjectiveQuestions.length;

      var allObjectiveQuestions = await QuestionBank.find({
        _id: {
          $in: rounds[i].question,
        },
        questionType: "Objective",
      });
      rounds[i].objectiveQuestion = allObjectiveQuestions.length;
      sQuest.a =
        sQuest.a + allObjectiveQuestions.length + allSubjectiveQuestions.length;
    } else {
      return res.status(401).json({
        success: false,
        message: "RoundName and question not selected",
      });
    }
  }

  console.log(rounds);

  const iRound = await InterviewRound.create({
    profile,
    noOfRound: rounds.length,
    noOfQuestion: sQuest.a,
    rounds,
    status,
  }).catch((err) => {
    console.log(`error creating interview round :: ${err}`);
    return null;
  });

  if (iRound === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Interview Round Added Successfully!",
    data: {
      profile: iRound?.profile,
      noOfQuestion: iRound?.noOfQuestion,
      noOfRound: iRound?.noOfRound,
    },
  });
});

export const getAllInterviewRound = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["INACTIVE", "ACTIVE"],
  };
  const allInterviewRound = await InterviewRound.find(condition).catch(
    (err) => {
      console.log(`error getting interview round :: ${err}`);
      return null;
    }
  );

  if (allInterviewRound === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error!",
    });
  }

  res.status(201).json({
    success: true,
    data: allInterviewRound,
  });
});

export const updateInterviewRoundById = bigPromise(async (req, res, next) => {
  // console.log(isEmpty(req.body))
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    profile: req.body.profile,
    noOfRound: req.body.noOfRound,
    noOfQuestion: req.body.noOfQuestion,
    rounds: req.body.rounds,
    status: req.body.status,
  };

  const ir = await InterviewRound.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating interview round ${err}`);
    return null;
  });

  if (ir === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  return res.status(201).json({
    success: true,
    data: ir,
  });
});

export const getQuestionByInterviewId = bigPromise(async (req, res, next) => {
  const interviewId = req.params.id;

  if (!interviewId) {
    return res.status(401).json({
      success: false,
      message: "Bad request",
    });
  }

  const qsIds = [];
  const interview = await InterviewRound.findById({ _id: interviewId });

  for (let i = 0; i < interview.rounds.length; i++) {
    for (let j = 0; j < interview.rounds[i].question.length; j++) {
      qsIds.push(interview.rounds[i].question[j]);
    }
    console.log(qsIds);
  }

  const questions = await QuestionBank.find({
    _id: {
      $in: qsIds,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Questions of this interview round.",
    data: questions,
  });
});

// Rounds Header
export const addRound = bigPromise(async (req, res, next) => {
  const { name, status } = req.body;

  if (!name) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const round = await Round.create({
    name,
    status,
  }).catch((err) => {
    console(`error creating Round :: ${err}`);
    return null;
  });

  if (round === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Round Added Successfully!",
    data: round,
  });
});

export const getAllRound = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
  };
  const allRound = await Round.find(condition).catch((err) => {
    console(`error getting rounds :: ${err}`);
    return null;
  });

  if (allRound == null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }

  res.status(201).json({
    success: true,
    data: allRound,
  });
});

export const updateRoundById = bigPromise(async (req, res, next) => {
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    name: req.body.name,
    status: req.body.status,
  };
  const round = await Round.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating round :: ${err}`);
    return null;
  });

  if (round === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server error",
    });
  }

  res.status(201).json({
    success: true,
    data: round,
  });
});

// State Header
export const addState = bigPromise(async (req, res, next) => {
  const { name, country, status } = req.body;

  if (!name || !country) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const state = await State.create({
    name,
    country,
    status,
  }).catch((err) => {
    console.log(`error creating state :: ${err}`);
    return null;
  });

  console.log(state);

  if (state === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "State Added Successfully!",
    data: state,
  });
});

export const getAllState = bigPromise(async (req, res, next) => {
  const country = req.query.country;
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
    country: country,
  };

  const states = await State.find(condition)
    .lean()
    .catch((err) => {
      console.log(`error getting state by country id :: ${err}`);
      return null;
    });

  if (states === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error !",
    });
  }

  res.status(201).json({
    success: true,
    data: states,
  });
});

export const updateStateById = bigPromise(async (req, res, next) => {
  // console.log(isEmpty(req.body))
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    name: req.body.name,
    country: req.body.country,
    status: req.body.status,
  };

  const state = await State.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating state :: ${err}`);
    return null;
  });

  if (state === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: state,
  });
});

// QuestionBank Header

export const addQuestionBank = bigPromise(async (req, res) => {
  try {
    var qb;
    const {
      departmentId,
      questionType,
      question,
      options,
      correctAnswer,
      status,
    } = req.body;

    if (!departmentId || !questionType) {
      return res.status(400).json({
        success: false,
        message: "Please select department and question type",
      });
    }
    const department = await Department.findById(
      {
        _id: departmentId,
      },
      ["name"]
    );

    if (!department) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }

    if (questionType === "Subjective") {
      qb = await QuestionBank.create({
        departmentId,
        questionType,
        question,
        correctAnswer,
        status,
      }).catch((err) => {
        console.log(`error creating question bank :: ${err}`);
        return null;
      });
    } else if (questionType === "Objective") {
      if (!options) {
        return res.status(400).json({
          success: false,
          message: "Please provide options for objective question.",
        });
      }
      qb = await QuestionBank.create({
        departmentId,
        questionType,
        question,
        options,
        correctAnswer,
        status,
      }).catch((err) => {
        console.log(`error creating question bank :: ${err}`);
        return null;
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid QuestionType",
      });
    }

    if (qb === null) {
      return res.status(501).json({
        success: false,
        message: "Internal server error",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Question Added Successfully!",
      data: qb,
    });
  } catch (error) {
    console.log(error);
  }
});

export const getAllQuestionBank = bigPromise(async (req, res, next) => {
  // fetch question button
  const { departmentId } = req.query;

  const condition = {
    status: ["INACTIVE", "ACTIVE"],
  };

  if (departmentId) {
    condition.departmentId = departmentId;
  }

  console.log(condition);

  const allQuestionBank = await QuestionBank.find(condition).catch((err) => {
    console.log(`error getting question bank :: ${err}`);
    return null;
  });

  if (allQuestionBank === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error!",
    });
  }

  return res.status(201).json({
    success: true,
    data: allQuestionBank,
  });
});

export const updateQuestionBankById = bigPromise(async (req, res, next) => {
  // console.log(isEmpty(req.body))
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    departmentId: req.body.departmentId,
    questionType: req.body.questionType,
    question: req.body.question,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer,
    status: req.body.status,
  };

  const qbank = await QuestionBank.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating question bank :: ${err}`);
    return null;
  });

  if (qbank === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: qbank,
  });
});

// Department Header
export const addDepartment = bigPromise(async (req, res, next) => {
  const { name, description, status } = req.body;

  if (!name || !description) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const dept = await Department.create({
    name,
    description,
    status,
  }).catch((err) => {
    console.log(`error creating department ::  ${err}`);
    return null;
  });

  if (dept === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Department Added Successfully!",
    data: dept,
  });
});

export const getAllDepartment = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
  };

  const allDepartment = await Department.find(condition).catch((err) => {
    console.log(`error getting department :: ${err}`);
    return null;
  });

  if (allDepartment === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error!",
    });
  }

  res.status(201).json({
    success: true,
    data: allDepartment,
  });
});

export const updateDepartmentById = bigPromise(async (req, res, next) => {
  // console.log(isEmpty(req.body))
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
  };

  const dept = await Department.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating department ${err}`);
    return null;
  });

  if (dept === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: dept,
  });
});

// Profile

export const addProfile = bigPromise(async (req, res, next) => {
  const {
    title,
    profileType,
    departmentId,
    band,
    reportProfile,
    approvingAuthority,
    status,
  } = req.body;

  if (!title || !profileType) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const profile = await Profile.create({
    title,
    profileType,
    departmentId,
    band,
    reportProfile,
    approvingAuthority,
    status,
  }).catch((err) => {
    console.log(`error creating profile ${err}`);
    return null;
  });

  if (profile === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Profile Added Successfully!",
    data: profile,
  });
});

export const updateProfileById = bigPromise(async (req, res, next) => {
  // console.log(isEmpty(req.body))
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    title: req.body.title,
    profileType: req.body.profileType,
    departmentId: req.body.departmentId,
    band: req.body.band,
    reportProfile: req.body.reportProfile,
    approvingAuthority: req.body.approvingAuthority,
    status: req.body.status,
  };

  const profile = await Profile.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating profile :: ${err}`);
    return null;
  });

  if (profile === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: profile,
  });
});

// filter based on band and departmentId
export const getAllProfile = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["INACTIVE", "ACTIVE"],
  };

  if (
    req.query.band &&
    req.query.band !== "null" &&
    req.query.band !== "undefined"
  ) {
    condition.band = { $lte: parseInt(req.query.band) };
  }

  if (
    req.query.departmentId &&
    req.query.departmentId !== "null" &&
    req.query.departmentId !== "undefined"
  ) {
    condition.departmentId = req.query.departmentId;
  }

  // const profiles = await Profile.find({"band":{$lte:req.query.band},"departmentId":req.query.departmentId}).lean()
  const profiles = await Profile.find()
    .where(condition)
    .lean()
    .catch((err) => {
      console.log(`error getting profiles by band and department :: ${err}`);
      return null;
    });

  if (profiles === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error !",
    });
  }

  res.status(201).json({
    success: true,
    data: profiles,
  });
});

// Job Description

export const addJobDescription = bigPromise(async (req, res, next) => {
  const {
    profile,
    dailyJob,
    responsibilities,
    kpi,
    eligibilityCriteria,
    status,
  } = req.body;

  if (!profile || !dailyJob || !responsibilities) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const jd = await JobDescription.create({
    profile,
    dailyJob,
    responsibilities,
    kpi,
    eligibilityCriteria,
    status,
  }).catch((err) => {
    console.log(`error creating Job Description :: ${err}`);
    return null;
  });

  console.log(jd);

  if (jd === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Job Description Added Successfully!",
    data: jd,
  });
});

export const getAllJobDescription = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
  };
  const allJd = await JobDescription.find(condition)
    .lean()
    .catch((err) => {
      console.log(`error getting job description :: ${err}`);
      return null;
    });

  if (allJd === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error !",
    });
  }

  res.status(201).json({
    success: true,
    data: allJd,
  });
});

export const updateJobDescriptionById = bigPromise(async (req, res, next) => {
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    profile: req.body.profile,
    dailyJob: req.body.dailyJob,
    responsibilities: req.body.responsibilities,
    kpi: req.body.kpi,
    eligibilityCriteria: req.body.eligibilityCriteria,
    status: req.body.status,
  };

  const jd = await JobDescription.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating job description :: ${err}`);
    return null;
  });

  if (jd === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: jd,
  });
});

// Work Shift
export const addWorkShift = bigPromise(async (req, res, next) => {
  const { name, status } = req.body;

  if (!name) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const ws = await WorkShift.create({
    name,
    status,
  }).catch((err) => {
    console.log(`error creating work shift :: ${err}`);
    return null;
  });

  console.log(ws);

  if (ws === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Work Shift Added Successfully!",
    data: ws,
  });
});

export const getAllWorkShift = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
  };
  const allWs = await WorkShift.find(condition)
    .lean()
    .catch((err) => {
      console.log(`error getting work shifts :: ${err}`);
      return null;
    });

  if (allWs === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error !",
    });
  }

  res.status(201).json({
    success: true,
    data: allWs,
  });
});

export const updateWorkShiftById = bigPromise(async (req, res, next) => {
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    name: req.body.name,
    status: req.body.status,
  };

  const ws = await WorkShift.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating work shift :: ${err}`);
    return null;
  });

  if (ws === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: ws,
  });
});

// WorkStyle
export const addWorkStyle = bigPromise(async (req, res, next) => {
  const { name, status } = req.body;

  if (!name) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const ws = await WorkStyle.create({
    name,
    status,
  }).catch((err) => {
    console.log(`error creating work style :: ${err}`);
    return null;
  });

  console.log(ws);

  if (ws === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Work Style Added Successfully!",
    data: ws,
  });
});

export const getAllWorkStyle = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
  };
  const allWs = await WorkStyle.find(condition)
    .lean()
    .catch((err) => {
      console.log(`error getting work styles :: ${err}`);
      return null;
    });

  if (allWs === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error !",
    });
  }

  res.status(201).json({
    success: true,
    data: allWs,
  });
});

export const updateWorkStyleById = bigPromise(async (req, res, next) => {
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    name: req.body.name,
    status: req.body.status,
  };

  const ws = await WorkStyle.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating work style :: ${err}`);
    return null;
  });

  if (ws === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: ws,
  });
});

// WorkType
export const addWorkType = bigPromise(async (req, res, next) => {
  const { name, status } = req.body;

  if (!name) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const ws = await WorkType.create({
    name,
    status,
  }).catch((err) => {
    console.log(`error creating work type :: ${err}`);
    return null;
  });

  console.log(ws);

  if (ws === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Work Type Added Successfully!",
    data: ws,
  });
});

export const getAllWorkType = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
  };
  const allWs = await WorkType.find(condition)
    .lean()
    .catch((err) => {
      console.log(`error getting work type :: ${err}`);
      return null;
    });

  if (allWs === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error !",
    });
  }

  res.status(201).json({
    success: true,
    data: allWs,
  });
});

export const updateWorkTypeById = bigPromise(async (req, res, next) => {
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    name: req.body.name,
    status: req.body.status,
  };

  const ws = await WorkType.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating work type :: ${err}`);
    return null;
  });

  if (ws === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: ws,
  });
});

// Band
export const addBand = bigPromise(async (req, res, next) => {
  const { name, status } = req.body;

  if (!name) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const ws = await Band.create({
    name,
    status,
  }).catch((err) => {
    console.log(`error creating band :: ${err}`);
    return null;
  });

  console.log(ws);

  if (ws === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Band Added Successfully!",
    data: ws,
  });
});

export const getAllBand = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
  };
  const allWs = await Band.find(condition)
    .lean()
    .catch((err) => {
      console.log(`error getting bands :: ${err}`);
      return null;
    });

  if (allWs === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error !",
    });
  }

  res.status(201).json({
    success: true,
    data: allWs,
  });
});

export const updateBandById = bigPromise(async (req, res, next) => {
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    name: req.body.name,
    status: req.body.status,
  };

  const ws = await Band.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating band :: ${err}`);
    return null;
  });

  if (ws === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: ws,
  });
});

// Compensation
export const addCompensation = bigPromise(async (req, res, next) => {
  const { name, status } = req.body;

  if (!name) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const ws = await Compensation.create({
    name,
    status,
  }).catch((err) => {
    console.log(`error creating compensation :: ${err}`);
    return null;
  });

  if (ws === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Compensation Added Successfully!",
    data: ws,
  });
});

export const getAllCompensation = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
  };
  const allWs = await Compensation.find(condition)
    .lean()
    .catch((err) => {
      console.log(`error getting compensation :: ${err}`);
      return null;
    });

  if (allWs === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error !",
    });
  }

  res.status(201).json({
    success: true,
    data: allWs,
  });
});

export const updateCompensationById = bigPromise(async (req, res, next) => {
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    name: req.body.name,
    status: req.body.status,
  };

  const ws = await Compensation.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating Compensation :: ${err}`);
    return null;
  });

  if (ws === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: ws,
  });
});

// Currency
export const addCurrency = bigPromise(async (req, res, next) => {
  const { name, status } = req.body;

  if (!name) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const ws = await Currency.create({
    name,
    status,
  }).catch((err) => {
    console.log(`error creating Currency :: ${err}`);
    return null;
  });

  if (ws === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Currency Added Successfully!",
    data: ws,
  });
});

export const getAllCurrency = bigPromise(async (req, res, next) => {
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
  };
  const allWs = await Currency.find(condition)
    .lean()
    .catch((err) => {
      console.log(`error getting Currency :: ${err}`);
      return null;
    });

  if (allWs === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error !",
    });
  }

  res.status(201).json({
    success: true,
    data: allWs,
  });
});

export const updateCurrencyById = bigPromise(async (req, res, next) => {
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    name: req.body.name,
    status: req.body.status,
  };

  const ws = await Currency.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating Currency :: ${err}`);
    return null;
  });

  if (ws === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: ws,
  });
});
