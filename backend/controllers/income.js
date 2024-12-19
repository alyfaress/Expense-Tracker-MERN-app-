const IncomeSchema= require("../models/IncomeModel")

/*same CRUD but with envolving userid
export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    if (!title || title.trim() === "") {
      res.status(400).json({ message: "Title is required!" });
    }

    if (!description || description.trim() === "") {
      res.status(400).json({ message: "Description is required!" });
    }

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.log("Error in createTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      res.status(400).json({ message: "User not found!" });
    }

    const tasks = await TaskModel.find({ user: userId });

    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Error in getTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const getTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log("Error in getTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } =
      req.body;

    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    // check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    // update the task with the new data if provided or keep the old data
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed || task.completed;

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in updateTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    // check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await TaskModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

/// Nuclear option for deleting all tasks
export const deleteAllTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await TaskModel.find({ user: userId });

    if (!tasks) {
      res.status(404).json({ message: "No tasks found!" });
    }

    // check if the user is the owner of the task
    if (!tasks.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await TaskModel.deleteMany({ user: userId });

    return res.status(200).json({ message: "All tasks deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteAllTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
});*/
    exports.addIncome = async (req, res) => {// this is only a function that takeb as parameter in app.method,so clearly it doesnt take a path 
        const {title, amount, category,type, description, date}  = req.body
    
        const income = IncomeSchema({//we directly added bonject in databse(IncomeSchema())
            title, //these are the structured variables,however they must be same spelling as in database ,else server will not know what to assign it in databse (try capitalixing or changing first letter here and in staructred error will be displayed when making post req and its var in databse will be empty),u can change structured var name ,then u have to assin database.nameofdatabaseproperty=varname...which is long avoid it
            amount,
            category,
            type,
            date,
            description,
        })
    
        try {
            //validations
            if(!title || !category || !description || !date){
                return res.status(400).json({message: 'All fields are required!'})
            }
            if(amount <= 0 || !amount === 'number'){
                return res.status(400).json({message: 'Amount must be a positive number!'})
            }
            await income.save()
            res.status(200).json({message: 'Income Added'})
        } catch (error) {
            console.error('Error occurred:', error.message); // Log the error for debugging
            res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
        }
    
       // console.log(income)
    }

    exports.getIncomes= async(req,res)=>{

        try {
           const allincomes=await IncomeSchema.find().sort({createdAt:-1})//we created "createdAt" property at database {timestamps: true},sort({createdAt:-1}) will sort database incomes and dispaly newest at the top(default:new displayed at bottum) 
           res.status(200).json(allincomes)
        }  catch (error) {
            console.error('Error occurred:', error.message); // Log the error for debugging
            res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
        }
    }



exports.deleteIncome= async(req,res)=>{
   const {id}=req.params
  // console.log(req.params)//important
 
   IncomeSchema.findByIdAndDelete(id)
   .then((income) =>{
    res.status(200).json({message: 'Income Deleted'})
})
.catch((err) =>{
    res.status(500).json({message: 'Server Error'})
})}

/*export const updateincome = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;
    const { title, amount, category,type, description, date } =req.body;
    const income = await TaskModel.findById(id);

    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }
   if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    // check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    // update the task with the new data if provided or keep the old data
    income.title = title || income.title;
    income.description = description || income.description;
    income.amount = amount || income.amount;
    income.category = category || income.category;
    income.date = date || income.date;
    income.type = type || income.type;

    await income.save();

    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in updateTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});
 */