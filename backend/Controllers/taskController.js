const taskModel = require("../Models/taskModel");

// Insert a task into the database
const taskInsert = async (req, res) => {
    try {
        let priority = req.body.priority;
        let title = req.body.title;
        let description = req.body.description;
        let date = req.body.date;
        let uname = req.body.uname;
        let ddetail = req.body.descriptiondetail;

        const taskdata = new taskModel({
            title: title,
            description: description,
            date: date,
            priority: priority,
            info: Date.now(),
            uname: uname,
            descriptiondetail: ddetail
        });

        await taskdata.save();
        res.send("Data received");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// Retrieve all tasks from the database
const taskDisplay = async (req, res) => {
    try {
        const data = await taskModel.find();
        res.send(data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// Retrieve all tasks from the database for priority view
const taskPriority = async (req, res) => {
    try {
        const data = await taskModel.find();
        res.send(data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// Update a task in the database
const taskUpdate = async (req, res) => {
    try {
        const data = await taskModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// Delete a task from the database
const taskDelete = async (req, res) => {
    try {
        const id = req.body.id;
        const User = await taskModel.findByIdAndDelete(id);
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "Are you sure you want to delete this task?",
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Retrieve a single task by ID from the database for editing
const taskEditData = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await taskModel.findById(id);
        res.json(data);
    
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// Update an edited task in the database
const editsave = async (req, res) => {
    try {
        const priority = req.body.priority;
        const myid = req.body._id;
        const title = req.body.title;
        const description = req.body.description;
        const date = req.body.date;
        const uname = req.body.uname;
        const ddetail = req.body.descriptiondetail;

        await taskModel.findByIdAndUpdate(myid, {
            title: title,
            description: description,
            date: date,
            priority: priority,
            info: Date.now(),
            uname: uname,
            descriptiondetail: ddetail
        });

        res.send("Updated");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// Update the status of a task in the database
const statusdisplay = async (req, res) => {
    try {
        const todo = await taskModel.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.status = req.body.status || todo.status;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update the priority of a task in the database
const updateTaskPriority = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { priority } = req.body;
      
        await taskModel.findByIdAndUpdate(taskId, { priority: priority });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    taskInsert,
    taskDisplay,
    taskUpdate,
    taskDelete,
    taskEditData,
    editsave,
    statusdisplay,
    taskPriority,
    updateTaskPriority
};
