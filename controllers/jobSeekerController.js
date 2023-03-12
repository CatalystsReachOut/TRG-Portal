import bigPromise from "../middlewares/bigPromise.js";
import JobSeeker from "../models/Jobseeker.js";
import sendEmail from "../utils/mailHelper.js";
import Otp from "../models/Otp.js";
import QuestionBank from "../models/headers/questionBank.js";
import JobApplication from "../models/JobApplication.js";

const generateOTP = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const sendOTP = async (email, OTPGen) => {
  // Otp Existence check
  const otp = await Otp.findOne({ email: email });
  if (otp !== null) {
    // Update Existing OTP
    var newOtp = await Otp.findByIdAndUpdate(
      otp._id,
      { email: email, otp: OTPGen },
      { new: true, runValidators: true, useFindAndModify: false }
    );
  } else {
    // Create New OTP
    var newOtp = await Otp.create({ email: email, otp: OTPGen });
  }

  // Send Mail
  await sendEmail({
    email: email,
    subject: "Your OTP (Valid for 5 minutes)",
    message: `Your One Time Password is ${OTPGen}`,
  });

  return newOtp;
};

export const registerJobSeeker = bigPromise(async (req, res, next) => {
  const {
    fullName,
    email,
    password,
    address,
    phoneNumber,
    experience,
    education,
    avatar,
  } = req.body;

  const toStore = {
    fullName,
    email,
    password,
    address,
    phoneNumber,
    experience,
    education,
    avatar,
  };

  if (!fullName || !email || !password) {
    return res.status(401).json({
      success: false,
      message: "Full Name, Email, Password and WorkStatus is required",
    });
  }

  const emailIsActive = await JobSeeker.findOne({
    email,
    isActive: true,
    isVerified: true,
  });

  if (emailIsActive) {
    return res.status(406).json({
      success: false,
      message: "User already exists with this email id.",
    });
  }

  const OTPGen = generateOTP();
  const notVerifiedUser = await JobSeeker.find({
    email: email,
    isVerified: false,
  })
    .lean()
    .catch((err) => {
      console.log(`error getting verified user ${err}`);
      return null;
    });

  if (notVerifiedUser.length === 0) {
    const jobSeeker = await JobSeeker.create(toStore).catch((err) => {
      console.log(`error creating user ${err}`);
    });
    const newOtp = sendOTP(email, OTPGen);
    if (newOtp) {
      res.status(200).json({
        success: true,
        message: `OTP was sent successfully to your ${email}.`,
        otp: OTPGen,
      });
    }
  } else {
    const newOtp = sendOTP(email, OTPGen);
    if (newOtp) {
      res.status(200).json({
        success: true,
        message: `OTP was sent successfully to your ${email}.`,
        otp: OTPGen,
      });
    }
  }
});

export const otpValid = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    console.log(otp, email);
    const verify = await Otp.findOne({ email, otp })
      .lean()
      .catch((err) => {
        console.log(`error validating Otp :: ${err}`);
        return null;
      });

    if (verify === null) {
      return res.status(400).json({
        success: false,
        message: "Invalid token or Token expired",
      });
    }

    const jobSeeker = await JobSeeker.findOneAndUpdate(
      { email: email },
      { isVerified: true },
      { new: true }
    );

    const data = { token: jobSeeker.generateJWT() };

    res.status(200).json({
      success: true,
      message: "JobSeeker Registered Successfully!",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginJobSeeker = bigPromise(async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({
      success: "false",
      message: "Email and Password fields are required.",
    });
  }
  const jobSeeker = await JobSeeker.findOne({ email: email }).catch((err) => {
    console.log(`error finding jobseeker ${err}`);
    return null;
  });

  if (jobSeeker === null) {
    return res.status(400).json({
      success: "false",
      message: "You're not registered in our app",
    });
  }

  const isPasswordCorrect = await jobSeeker.isValidatedPassword(
    password,
    jobSeeker.password
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: "false",
      message: "Incorrect Password",
    });
  }

  const token = jobSeeker.generateJWT();

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000 * 24 * 3,
    })
    .json({
      message: "LoggedIn Successfully!",
      token: token,
      data: jobSeeker,
    });
});

export const logout = bigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "loggedOut Successfully",
  });
});

export const getLoggedInJobSeekerDetails = bigPromise(
  async (req, res, next) => {
    const jobseeker = await Jobseeker.findById(req.user.id).catch((err) => {
      console.log(`error finding jobseeker details ${err}`);
      return null;
    });
    jobseeker.password = undefined;

    if (!jobseeker) {
      return res.status(501).json({
        success: false,
        message: "Internal server error!",
      });
    }

    res.status(200).json({
      success: true,
      jobseeker,
    });
  }
);

export const updateDetails = bigPromise(async (req, res, next) => {
  try {
    const id = req.user.id;
    const newData = {
      fullName: req.body.fullName,
      email: req.body.email,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      experience: req.body.experience,
      education: req.body.education,
      employment: req.body.employment,
      avatar: req.body.avatar,
      finalStep: req.query.finalStep,
    };

    const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
      .lean()
      .catch((err) => {
        console.log(`error updating JobSeeker details :: ${err}`);
        return null;
      });

    if (updatedJobSeeker === null) {
      return res.status(400).json({
        success: false,
        message: "Failed to update jobSeeker",
      });
    }

    const response = {
      success: true,
      message: "JobSeeker Updated Successfully!",
      data: updatedJobSeeker,
    };

    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
});

export const evaluate = bigPromise(async (req, res) => {
  const { answers, totalMarks, roundName, roundId } = req.body;
  const totalQuestions = answers.length;
  let earnedMark = 0;
  let perQuestionMark = totalMarks / totalQuestions;
  // console.log(perQuestionMark);

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];
    const question = await QuestionBank.findById(answer.questionId);
    if (!question) {
      return res.status(400).json({ error: "Invalid question ID" });
    }

    if (question.questionType === "Objective") {
      const selectedOption = question.options.find(
        (option) => option.answerBody === answer.selectedOption
      );
      if (!selectedOption) {
        return res.status(400).json({ error: "Invalid option selected" });
      }
      // console.log(selectedOption);
      if (selectedOption.answerBody === question.correctAnswer) {
        earnedMark += perQuestionMark;
      }
    } else {
      const keywords = question.correctAnswer.split(",");
      // console.log(keywords);
      var answerFlag = false;
      for (let i = 0; i < keywords.length; i++) {
        if (answer.selectedOption.includes(keywords[i])) {
          answerFlag = true;
        }
      }

      if (answerFlag === true) {
        earnedMark += perQuestionMark;
      }
    }
  }

  var result = "FAILED";
  const percentage = (earnedMark / totalMarks) * 100;
  if (percentage >= 60) {
    result = "PASSED";
  }

  const applicationId = req.params.applicationId;
  console.log(applicationId);

  const application = await JobApplication.findOne({
    _id: applicationId,
  });

  var roundNumber;

  if (application.roundWiseStats.length < application.totalRound) {
    roundNumber = application.roundWiseStats.length += 1;
    console.log(roundNumber);
    var newData = {
      marksObtained: earnedMark,
      percentage: percentage,
      roundId: roundId,
      roundName: roundName,
      roundNumber: roundNumber,
      status: result,
    };

    application?.roundWiseStats?.push(newData);
    await application.save();
  } else {
    application.status = "ALL-ROUND-PASSED";
    application.save();
    return res.status(200).json({
      success: true,
      message: `All Rounds Are Cleared`,
    });
  }
  return res.status(200).json({
    success: true,
    message: `Result of ${roundName}`,
    data: newData,
  });
});

export const getAllJobSeeker = bigPromise(async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.find({ isActive: true, isVerified: true })
      .lean()
      .catch((err) => {
        console.log(`error getting jobseeker ${err}`);
        return null;
      });

    if (jobSeeker === null) {
      return res.status(500).json({
        success: false,
        message: "Failed to get JobSeekers",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All JobSeekers",
      data: jobSeeker,
    });
  } catch (error) {
    console.log(error);
  }
});
