const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   firstName:{
       type: String,
       required:[true, 'A user must have a first name']
   },
   lastName:{
       type: String,
       required:[true, 'A user must have a last name']
   },
   
   email:{
       type: String,
       required:[true, 'A user must have an email address'],
       unique: true
   },
   password:{
       type: String,
       required:[true, 'A user must have a password']
   },   
   type: {
        type: String,
        default: 'user',
   }
});

module.exports =  mongoose.model('Users', userSchema);
