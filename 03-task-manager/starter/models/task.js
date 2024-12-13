const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        name : {
            type : String,
            required : true,
            maxLenght : 20,
            trim: true
        },
        completed : {
            type : String,
            required : true,
            default: false
        },    
});

module.exports = mongoose.model('Task' , taskSchema);