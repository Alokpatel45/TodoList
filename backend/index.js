const express=require("express");
const { createTodo } = require("./types");
const {todo}=require("./db");
const cors=require("cors")

const app=express();
app.use(express.json());
app.use(cors());
app.listen(3000,()=>{
    console.log("listening");
});
app.post("/todo",async (req,res)=>{
        const createPayload=req.body;
        const parsedPayload=createTodo.safeParse(createPayload);
        if(!parsedPayload.success){
            res.status(411).json({
                messege:"wrong input"
            })
            return;
        }
        await todo.create({
            title:createPayload.title,
            description:createPayload.description,
        })
        res.json({ 
            messege:"user created"
        });
        
});
app.get("/todos",async (req,res)=>{
    const todos=await todo.find({});
    console.log(todos);
    res.json({
        todos
    })
});
app.post("/completed",async (req,res)=>{
    const updatePayload=req.body;
    const parsedPayload=createTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            messege:"wrong input"
        })
        return;
    }
    todo.update({_id:updatePayload.id},{
        completed:true
    })
    res.json({
        msg:"complete"
    })
});
app.delete('/todo/:id', async (req, res) => {
    const todoId = req.params.id;
    console.log('Deleting todo with ID:', todoId); // Debug log

    try {
        const result = await todo.deleteOne({ _id: todoId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ message: 'Failed to delete todo', error: err });
    }
});

