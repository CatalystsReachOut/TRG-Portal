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
<<<<<<< HEAD

router.route("/jobApplication/applicant/:id").put(updateApplicant);
=======
router.route("/jobApplication/applicant/:id").put(isLoggedIn, updateApplicant);
>>>>>>> 2bd7ab3d940eadc7aa09669eaf27b14cf5d3fc8a


export default router;
