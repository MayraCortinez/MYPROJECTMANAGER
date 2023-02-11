const mongoose = require('mongoose'); 


var projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    dateExpire:{
        type:Date,
        default: Date.now()
    },
    client:{
        type:String,
        required:true,
        trim:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    collaborators:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref : 'User',
        }
    ],
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref : 'Task',
        }
    ]
},{
    timestamps:true
}
);


module.exports = mongoose.model('Project', projectSchema);