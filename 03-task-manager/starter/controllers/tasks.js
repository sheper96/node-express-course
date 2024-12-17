const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const createCustomError = require('../errors/custom-error')

exports.getAllTasks = asyncWrapper(async (req, res, next) => {


    const tasks = await Task.find()
    if (!tasks){
        const error = new Error("Not Found")
        error.status = 404
        return next(error)
    }
    res.status(200).json({
        message: "Tasks Fetched Succesfully",
        tasks: tasks
    })

    // catch (err) {
    //     res.status(400).json({
    //         message: "Error Fetching Tasks",
    //         error: err.message
    //     })
    // }
})

exports.createTask = asyncWrapper(async (req, res, next) => {

    const name = req.body.name
    const task = new Task({
        name: name,
    })
    await task.save()
    res.status(200).json({
        message: "Task Crerated Succesfully",
        task: task
    })

    // catch (err) {
    //     res.status(400).json({
    //         message: "Error While Creating a New Task",
    //         error: err.message
    //     })
    // }
})

exports.getTask = asyncWrapper(async (req, res, next) => {

    const taskId = req.params.taskId
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
       return next(createCustomError(`Task : ${taskId} not found`, 404))
    }
    else {
        res.status(200).json({
            message: "Task Fetched Succesfully",
            task: task
        })
    }

    // catch (err) {
    //     res.status(400).json({
    //         message: "Error Fetching Task",
    //         error: err.message
    //     })
    // }
})

exports.deleteTask = asyncWrapper(async (req, res, next) => {


    const taskId = req.params.taskId
    const task = await Task.findOneAndDelete({ _id: taskId })
    if (!task) {
        return next(createCustomError(`Task Not Found Or Already Deleted`, 404))
    }
    else {
        res.status(200).json({
            message: "Task Deleted Succesfully",
        })
    }

    // catch (err) {
    //     res.status(400).json({
    //         message: "Error Deleting Task",
    //         error: err.message
    //     })
    // }
})

exports.updateTask = asyncWrapper(async (req, res, next) => {

    const taskId = req.params.taskId
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, { new: true, runValidators: true, })
    if (!task) {
        return next(createCustomError(`Task Not Found `, 404))
    }
    else {
        res.status(200).json({
            message: "Task Updated Succesfully",
            task: task
        })
    }


    // catch (err) {
    //     res.status(400).json({
    //         message: "Error Updpating Task",
    //         error: err.message
    //     })
    // }
})