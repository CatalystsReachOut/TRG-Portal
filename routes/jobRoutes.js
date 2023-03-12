import express from "express";
const router = express.Router();

// import controller
import {
  addJob,
  deletedJobById,
  getAllJobs,
  getJobById,
  getJobByIdJobSeeker,
  updateJobById,
} from "../controllers/jobController.js";
// import userMiddlewares
import { isLoggedIn as isTo, customRole } from "../middlewares/userMiddlewares.js";

import {isLoggedIn as isJobSeekerLoggedIn} from "../middlewares/jobSeekerMiddleware.js"

// routes
router.route("/job").post(isTo, addJob);
router.route("/job").get(getAllJobs);
router.route("/job/:id").put(isTo, updateJobById);
router.route("/job/:id").get(getJobById);
router.route("/job/:id").delete(deletedJobById);
router.route('/job/jobseeker/:id').get(isJobSeekerLoggedIn, getJobByIdJobSeeker)
export default router;
