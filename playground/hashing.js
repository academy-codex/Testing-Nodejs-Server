// var jwt = require('jsonwebtoken');
//
// let data = {
//     id: 4
// };
//
// let token = jwt.sign(data, '123');
// console.log(token);
//
// try {
//     jwt.verify(token, '123');
//     console.log("Data Okay.")
// } catch (err){
//     console.log("Data tampered.")
//}

var bcrypt = require('bcryptjs');

let password = "123abc!";

bcrypt.genSalt(10, (err, salt)=>{
   bcrypt.hash(password, salt, (err, hash)=>{
       console.log(hash);
   });
});