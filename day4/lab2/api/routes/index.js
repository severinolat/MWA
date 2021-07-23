const express = require("express");
 const controllerStudents = require("../controllers/student.controller");
 const controllerCourses = require("../controllers/course.controller");

 const router = express.Router();

 router.route("/students")
    .get(controllerStudents.studentsgetAll);

router.route("/students/:studentId")
    .get(controllerStudents.studentsgetOne);

router.route("/students/:studentId/courses")
    .get(controllerCourses.coursesgetAll);

router.route("/students/:studentId/courses/:courseId")
    .get(controllerCourses.courseGetOne);

module.exports = router;