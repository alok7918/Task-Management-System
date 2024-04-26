const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/taskController");

// Routes for task CRUD operations
router.post("/insert", taskController.taskInsert);
router.post("/delete", taskController.taskDelete);
router.post("/editsave", taskController.editsave);
router.post("/geteditdata", taskController.taskEditData);
router.get("/display", taskController.taskDisplay);
router.get("/priority", taskController.taskPriority);
router.get("/update", taskController.taskUpdate); 
router.put("/display/:id", taskController.statusdisplay);
router.put("/:id", taskController.updateTaskPriority);

module.exports = router;
