const {
    readTasks,
    writeTasks
} = require("../services/fileService");

// GET
const getTasks = (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
};

// POST
const addTask = (req, res) => {

    const tasks = readTasks();

    const newTask = {
        id: Date.now(),
        ...req.body
    };

    tasks.push(newTask);

    writeTasks(tasks);

    res.status(201).json({
        success: true,
        message: "Task Added Successfully",
        data: newTask
    });

};

// PUT
const updateTask = (req, res) => {

    const tasks = readTasks();

    const id = Number(req.params.id);

    const index = tasks.findIndex(
        task => task.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Task Not Found"
        });
    }

    tasks[index] = {
        ...tasks[index],
        ...req.body
    };

    writeTasks(tasks);

    res.json({
        success: true,
        message: "Task Updated Successfully",
        data: tasks[index]
    });

};

// DELETE
const deleteTask = (req, res) => {

    const tasks = readTasks();

    const id = Number(req.params.id);

    const filteredTasks = tasks.filter(
        task => task.id !== id
    );

    if (filteredTasks.length === tasks.length) {
        return res.status(404).json({
            success: false,
            message: "Task Not Found"
        });
    }

    writeTasks(filteredTasks);

    res.json({
        success: true,
        message: "Task Deleted Successfully"
    });

};

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
};