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
import Workshift from "../../models/headers/workShift.js";
import Worktype from "../../models/headers/workType.js";
import Compensation from "../../models/headers/compensation.js";

import { isEmpty } from "../../utils/isEmpty.js";
import bigPromise from "../../middlewares/bigPromise.js";
import Employee from "../../models/Employee.js";

import { WhereClause } from "../../utils/whereClause.js";

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
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
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
  const { profile, noOfRound, noOfQuestion, rounds } = req.body;

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
  const allInterviewRound = await InterviewRound.find({}).catch((err) => {
    console.log(`error getting interview round :: ${err}`);
    return null;
  });

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
    name: req.body.name,
    profile: req.body.profile,
    noOfRound: req.body.noOfRound,
    noOfQuestion: req.body.noOfQuestion,
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
  const allRound = await Round.find({}).catch((err) => {
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
  const condition = {
    status: ["ACTIVE", "INACTIVE"],
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
    const { departmentName, questionType, question, options, correctAnswer } =
      req.body;

    if (!departmentName || !questionType) {
      return res.status(400).json({
        success: false,
        message: "Please select department and question type",
      });
    }
    const department = await Department.findOne({
      name: departmentName,
    });

    if (!department) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }

    if (questionType === "Subjective") {
      qb = await QuestionBank.create({
        departmentName,
        questionType,
        question,
        correctAnswer,
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
        departmentName,
        questionType,
        question,
        options,
        correctAnswer,
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
  const { departmentName } = req.query;

  const condition = {};

  if (departmentName) {
    condition.departmentName = departmentName;
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
    departmentName: req.body.departmentName,
    questionType: req.body.questionType,
    question: req.body.question,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer,
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
  const { title, profileType, departmentId, band, reportProfile, status } =
    req.body;

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
  const condition = {};

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

// WorkShift

export const addWorkShift = bigPromise(async (req, res, next) => {
  const { title, status } = req.body;

  if (!title) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const ws = await Workshift.create({
    title,
    status,
  }).catch((err) => {
    console.log(`error creating work shift :: ${err}`);
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
    message: "Work Shift Added Successfully!",
    data: ws,
  });
});

export const getAllWorkShift = bigPromise(async (req, res, next) => {
  const allWorkShift = await Workshift.find({})
    .lean()
    .catch((err) => {
      console.log(`error getting workshift :: ${err}`);
      return null;
    });

  if (allWorkShift === null) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error !",
    });
  }

  res.status(201).json({
    success: true,
    data: allWorkShift,
  });
});

export const updateWorkShiftById = bigPromise(async (req, res, next) => {
  // console.log(isEmpty(req.body))
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    title: req.body.title,
    status: req.body.status,
  };

  const ws = await Workshift.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating works shift :: ${ws}`);
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
  const { title, status } = req.body;

  if (!title) {
    return res.status(401).json({
      success: false,
      message: "Bad request",
    });
  }

  const wt = await Worktype.create({
    title,
    status,
  }).catch((err) => {
    console.log(`error creating work type ::  ${err}`);
    return null;
  });

  if (wt === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Work Type Added Successfully!",
    data: wt,
  });
});

export const getAllWorkType = bigPromise(async (req, res, next) => {
  const allWorkType = await Worktype.find({}).catch((err) => {
    console.log(`error getting worktype :: ${err}`);
    return null;
  });

  if (allWorkType === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error!",
    });
  }

  res.status(201).json({
    success: true,
    data: allWorkType,
  });
});

export const updateWorkTypeById = bigPromise(async (req, res, next) => {
  // console.log(isEmpty(req.body))
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    title: req.body.title,
    status: req.body.status,
  };

  const wt = await Worktype.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating work type ::  ${err}`);
    return null;
  });

  if (wt === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: wt,
  });
});

// Compensation

export const addCompensation = bigPromise(async (req, res, next) => {
  const { data, status } = req.body;

  if (!data) {
    return res.status(401).json({
      success: false,
      message: "Bad Request",
    });
  }

  const cs = await Compensation.create({
    data,
    status,
  }).catch((err) => {
    console.log(`error creating compensation :: ${err}`);
    return null;
  });

  if (cs === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    message: "Compensation Added Successfully!",
    data: cs,
  });
});

export const getAllCompensation = bigPromise(async (req, res, next) => {
  const allCompensation = await Compensation.find({}).catch((err) => {
    console.log(`error getting compensation :: ${err}`);
    return null;
  });

  if (allCompensation === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error!",
    });
  }

  res.status(201).json({
    success: true,
    data: allCompensation,
  });
});

export const updateCompensationById = bigPromise(async (req, res, next) => {
  // console.log(isEmpty(req.body))
  if (isEmpty(req.body)) {
    return res.status(401).json({
      success: "false",
      message: "Nothing to update.",
    });
  }

  const newData = {
    data: req.body.data,
    status: req.body.status,
  };

  const cs = await Compensation.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).catch((err) => {
    console.log(`error updating compensation :: ${err}`);
    return null;
  });

  if (cs === null) {
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }

  res.status(201).json({
    success: true,
    data: cs,
  });
});
