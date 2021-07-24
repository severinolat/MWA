const express = require("express");
 const controllerStudents = require("../controllers/student.controller");
 const controllerCourses = require("../controllers/course.controller");

 const router = express.Router();

 router.route("/students")
    .get(controllerStudents.studentsgetAll)
    .post(controllerStudents.studentsAddOne);

router.route("/students/:studentId")
    .get(controllerStudents.studentsgetOne)
    .put(controllerStudents.studentsFullUpdateOne)
    .patch(controllerStudents.studentsPartialUpdateOne)
    .delete(controllerStudents.studentsDeleteOne);

router.route("/students/:studentId/courses")
    .get(controllerCourses.coursesgetAll);

router.route("/students/:studentId/courses/:courseId")
    .get(controllerCourses.courseGetOne);

module.exports = router;