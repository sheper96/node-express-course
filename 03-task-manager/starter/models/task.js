const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        name : {
            type : String,
            required : [true, 'must provide name'],
            maxLenght : [20, 'name cannot be more than 20 characters'],
            trim: true
        },
        completed : {
            type : Boolean,
            default : false,
        },    
});

module.exports = mongoose.model('Task' , taskSchema);