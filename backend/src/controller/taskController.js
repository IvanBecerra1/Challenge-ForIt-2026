const task = require('../model/task');
const express = require("express");
const router = express.Router();

const {
    getAllTask,
    createTask,
    updateTask,
    deleteTask
} = require('../servicio/taskService');

router.get('/', getAllTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;

