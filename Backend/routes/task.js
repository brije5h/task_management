const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const { authenticateToken } = require("./auth");


//create-task
router.post("/create-task", authenticateToken , async (req,res)=>{
    try{
        const { title, desc } = req.body;
        console.log("Header data.....");
        console.log(req.headers);
        const { id } = req.headers;
        const newTask = new Task({ title:title, desc:desc});
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id,{$push:{tasks: taskId._id}});
        res.status(200).json({message : "Task has been created"});

    } catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"})
    }
});

//get all tasks
router.get("/get-all-tasks", authenticateToken, async(req,res)=>{
    try{
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "tasks",
            options: { sort:{ createdAt:-1 }},
        });
        console.log(`${userData} data fetched!`);
        res.status(200).json({data:userData});

    }catch{
        console.log(err);
        return res.status(500).json({message:"Internal server error"})
    }
});

//delete task
router.delete("/delete-task/:id", authenticateToken, async(req,res)=>{
    try{
        const { id } = req.params;
        const userId = req.headers.id;

        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { tasks:id } } )
        console.log('task deleted!');
        res.status(200).json({message:"Task deleted"});

    }catch{
        console.log(err);
        return res.status(500).json({message:"Internal server error"})
    }
});

//update Task
router.put("/update-task/:id", authenticateToken, async(req,res)=>{
    try{
        const { id } = req.params;
        const { title, desc } = req.body;

        await Task.findByIdAndUpdate(id, {title:title,desc:desc});
        
        console.log('task updated!');
        res.status(200).json({message:"Task Updated"});

    }catch{
        console.log(err);
        return res.status(500).json({message:"Internal server error"})
    }
});

//update Important task
router.put("/update-imp-task/:id", authenticateToken, async(req,res)=>{
    try{
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const ImptTask = TaskData.important;

        await Task.findByIdAndUpdate(id, { important: !ImpTask });
        
        console.log('Mark as important!');
        res.status(200).json({message:"Marked as Important"});

    }catch{
        console.log(err);
        return res.status(500).json({message:"Internal server error"})
    }
});

//update Complete task
router.put("/update-completed-task/:id", authenticateToken, async(req,res)=>{
    try{
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const CompTask = TaskData.complete;

        await Task.findByIdAndUpdate(id, { complete: !CompTask });
        
        console.log('Completed!');
        res.status(200).json({message:"Task Completed"});

    }catch{
        console.log(err);
        return res.status(500).json({message:"Internal server error"})
    }
});



module.exports = router;