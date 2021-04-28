//model
const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  university_id: {
    type: String,
    required: true,
  }
});

var universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const userDB = mongoose.model("userdb", userSchema);
const universityDB = mongoose.model("universitydb", universitySchema);

class model {

  async findUniversity() {
    try{
      let allUniversity = await universityDB.find();
      return allUniversity;
    }catch(err) {
      console.log(err.message);
    }
  }

  async findUser() {
    try{
      let allUser = await userDB.find();
      return allUser;
    }catch(err) {
      console.log(err.message);
    }
  }

   async addUniversity(input) {
     try {
      let university = new universityDB({name : input.name});
      let data = await university.save();
      return data;
     }catch(err) {
      console.log(err.message);
     }
  }

  async addUser(input) {
    let res = {};
    try {
      if(parseInt(input.id) && ((input.id).subString(0,2) == "60"|| (input.id).subString(0,2) == "61" )){
        let user = new userDB({
          id:input.id,
          firstname: input.firstname,
          lastname: input.lastname,
          age: input.age,
          university_id: input.university_id
         });
        let data = await user.save();
        res = {error: "" , data:data}
        return res;
      }
      else {
        res = {error: "Input not match ", data:""}
        return res
      }
    }catch(err) {
     console.log(err.message);
    }
 }
   
}

module.exports = model;