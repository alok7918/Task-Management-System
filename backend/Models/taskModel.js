const mongoose=require("mongoose")
mongoose.set('strictQuery', false);
const taskSchema=mongoose.Schema({
    
    title:String,
    description:String,
    date:String,
    uname:String,
    descriptiondetail:String,
    priority:String,
    info: {
        type: String,
        required: [true,"Time is required"],
      } ,
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
      }
       
      
})

module.exports=mongoose.model("Task",taskSchema)