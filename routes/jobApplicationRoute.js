import express from "express";
const router = express.Router();

// import controllers
import {
  jobApplication,
  getQuestionsJobId,
  getAllApplicant,
  getApplicantJobs
  // evaluate,
} from "../controllers/jobApplication.js";

// import userMiddlewares
import { isLoggedIn } from "../middlewares/jobSeekerMiddleware.js";

// routes
router.route("/jobApplication/:jobId").post(isLoggedIn, jobApplication);
router.route("/jobApplication/myApplications").get(isLoggedIn, getApplicantJobs);
router.route("/jobApplication/questions/:jobId").get(isLoggedIn, getQuestionsJobId);
router.route("/jobApplication/applicant").get(getAllApplicant);  // for admin


export default router;
