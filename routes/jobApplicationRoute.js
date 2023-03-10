import express from "express";
const router = express.Router();

// import controllers
import {
  jobApplication,
  getQuestionsJobId,
  getAllApplicant,
  getApplicantJobs,
  updateApplicant
  // evaluate,
} from "../controllers/jobApplication.js";

// import userMiddlewares
import { isLoggedIn } from "../middlewares/jobSeekerMiddleware.js";

// routes
router.route("/jobApplication/:jobId").post(isLoggedIn, jobApplication);
router.route("/jobApplication/myApplications").get(isLoggedIn, getApplicantJobs);
router.route("/jobApplication/questions/:jobId").get(isLoggedIn, getQuestionsJobId);
router.route("/jobApplication/applicant").get(getAllApplicant);  // for admin
router.route("/jobApplication/applicant/:id").put(isLoggedIn, updateApplicant);


export default router;
