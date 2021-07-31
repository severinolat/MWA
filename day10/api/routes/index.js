const express = require("express");

const controllerJob = require("../controller/job.controller");
const controllerSkill= require("../controller/skill.controller");
const controllerLocation= require("../controller/location.controller");



const router = express.Router();


router.route("/jobs")
    .get(controllerJob.jobsgetAll)
    .post(controllerJob.jobsAddOne);

router.route("/jobs/:jobId")
    .put(controllerJob.jobsFullUpdateOne)
    .patch(controllerJob.jobsPartialUpdateOne)   
    .delete(controllerJob.jobDeleteOne)
    

router.route("/jobs/:jobId/skills")
    .post(controllerSkill.skillAddOne)
    .get(controllerSkill.skillgetAll);

router.route("/jobs/:jobId/skills/:skillId")
    .put(controllerSkill.skillFullUpdateOne)  
    .delete(controllerSkill.skillDeleteOne);

router.route("/jobs/:jobId/location")
    .post(controllerLocation.locationAddOne)
    .put(controllerLocation.locationFullUpdate)
    .delete(controllerLocation.locationDeleteOne);



module.exports = router;