const Task = require('../models/task')

exports.getAllTasks = async (req, res, next) => {

    try {
        const tasks = await Task.find()
        res.status(200).json({
            message: "Tasks Fetched Succesfully",
            tasks: tasks
        })
    }
    catch (err) {
        res.status(400).json({
            message: "Error Fetching Tasks"
        })
    }
}

exports.createTask = (req, res, next) => {
    const name = req.body.name
    const task = new Task({
        name: name,
    })
    task.save()
        .then(task => {
            res.status(200).json({
                message: "Task Crerated Succesfully",
                task: task
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Error While Creating a New Task'
            })
        })
}

exports.getTask = async (req, res, next) => {

    try {
        const taskId = req.params.taskId
        const task = await Task.findOne({ _id: taskId })
        if (!task) {
            res.status(200).json({
                message: "Task Not Found "
            })
        }
        else {
            res.status(200).json({
                message: "Task Fetched Succesfully",
                task: task
            })
        }
    }
    catch (err) {
        res.status(400).json({
            message: "Error Fetching Task"
        })
    }
}

exports.deleteTask = async (req, res, next) => {

    try {
        const taskId = req.params.taskId
        const task = await Task.findOneAndDelete({ _id: taskId })
        if (!task) {
            res.status(200).json({
                message: "Task Not Found Or Already Deleted"
            })
        }
        else {
            res.status(200).json({
                message: "Task Deleted Succesfully",
            })
        }
    }
    catch (err) {
        res.status(400).json({
            message: "Error Deleting Task"
        })
    }
}

exports.updateTask = async (req, res, next) => {

    try{
        const taskId = req.params.taskId
        const name = req.body.name
        const task = await Task.findOneAndUpdate({  _id: taskId }, { name: name }, { new: true })
        if (!task) {
            res.status(400).json({
                message: "Task Not Found"
            })
        }
        else {
            res.status(200).json({
                message: "Task Updated Succesfully",
                task: task
            })
        }
    }

    catch(err){
        res.status(400).json({
            message: "Error Deleting Task"
        })
    }
}