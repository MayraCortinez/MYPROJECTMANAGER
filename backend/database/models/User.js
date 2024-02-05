const mongoose = require('mongoose'); 
const {hash, compare} = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    token:{
        type:String,
    },
    checked:{
        type:Boolean,
        default: false,
        trim:true
    },
},{
    timestamps: true,
}
);

userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        next()                                                  // hash password update
    }
    this.password = await hash(this.password, 10)
});

userSchema.methods.checkedPassword = async function(password){
    return await compare(password, this.password)                 // devuelve booleano
};

module.exports = mongoose.model('User', userSchema);        