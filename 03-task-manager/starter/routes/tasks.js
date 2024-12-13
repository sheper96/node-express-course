const express = require('express')

const router = express.Router();
const taskController = require('../controllers/tasks');


router.get('/',  taskController.getAllTasks)
router.get('/:taskId',  taskController.getTask)
router.delete('/:taskId',  taskController.deleteTask)
router.post('/',  taskController.createTask)
router.patch('/:taskId',  taskController.updateTask)



module.exports = router;