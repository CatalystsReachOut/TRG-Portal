import express from "express"
const router = express.Router()

// import controller 
import { addBusiness, addCity, addCountry, addInterviewRound, addRound, getAllBusiness, getAllCity, getAllCountry, getAllInterviewRound, getAllRound, updateBusinessById, updateCityById, updateCountryById, updateInterviewRoundById, updateRoundById, addState, getAllState, updateStateById, addQuestionBank, getAllQuestionBank, updateQuestionBankById, addDepartment, getAllDepartment, updateDepartmentById, addProfile, getAllProfile, updateProfileById, addWorkMode, getAllWorkMode, updateWorkModeById, addJobDescription, getAllJobDescription, updateJobDescriptionById } from "../controllers/headers/headers.controller.js"
import { addJob } from "../controllers/jobController.js"
// import userMiddlewares
// import {isLoggedIn,customRole} from "../middlewares/userMiddlewares.js"

// Business Header
router.route("/business").post(addBusiness)
router.route("/business").get(getAllBusiness)
router.route("/business/:id").put(updateBusinessById)

// City Header
router.route("/city").post(addCity)
router.route("/city").get(getAllCity)
router.route("/city/:id").put(updateCityById)

// Country Header
router.route("/country").post(addCountry)
router.route("/country").get(getAllCountry)
router.route("/country/:id").put(updateCountryById)

// Interview Round Header
router.route("/interviewRound").post(addInterviewRound)
router.route("/interviewRound").get(getAllInterviewRound)
router.route("/interviewRound/:id").put(updateInterviewRoundById)

// Round Header
router.route("/round").post(addRound)
router.route("/round").get(getAllRound)
router.route("/round/:id").put(updateRoundById)

// State Header
router.route("/state").post(addState)
router.route("/state").get(getAllState)
router.route("/state/:id").put(updateStateById)

// Question Bank Header
router.route("/questionBank").post(addQuestionBank)
router.route("/questionBank").get(getAllQuestionBank)
router.route("/questionBank/:id").put(updateQuestionBankById)

// Department Header
router.route("/department").post(addDepartment)
router.route("/department").get(getAllDepartment)
router.route("/department/:id").put(updateDepartmentById)

// Profile Header
router.route("/profile").post(addProfile)
router.route("/profile").get(getAllProfile)
router.route("/profile/:id").put(updateProfileById)

// WorkMode Header
router.route("/work").post(addWorkMode)
router.route("/work").get(getAllWorkMode)
router.route("/work/:id").put(updateWorkModeById)

// Job Description Header
router.route("/jobDescription").post(addJobDescription)
router.route("/jobDescription").get(getAllJobDescription)
router.route("/jobDescription/:id").put(updateJobDescriptionById)

export default router;