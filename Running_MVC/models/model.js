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
  distance: {
    type: Number,
    required: true,
  }
});
//log add distance 
var add_distanceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
});
const userDB = mongoose.model("userdb", userSchema);
const distanceDB = mongoose.model("distancedb", add_distanceSchema);

//findAll
exports.find = async () => {
  try {
    const response = await userDB.find();
    return response;
  } catch (err) { console.log(err.message);}
};

//showUserTop-Ten
exports.findTopTen = async () => {
  try {
    const response = await userDB.aggregate([
      {
        $sort: {distance: -1},
      },
      {
        $limit: 10
      },
    ]);
    return response;
  } catch (err) { console.log(err.message);}
};

//Winner
exports.findWinner = async () => {
  try {
    const response = await userDB.find();
    const userWin = response.filter(user => user.distance > 42.195);
    return userWin;
  } catch (err) { console.log(err.message);}
};

//function Generate ID 
const GenerateID = () => {
  const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXXYZ";
  const AlphabetLength = Alphabet.length;
  const Number = "1234567890";
  const NumberLength =  Number.length;
  let result = ""
  for (let i = 0; i<3;i++){
    result += Alphabet.charAt(Math.floor(Math.random() * AlphabetLength)); 
  }
  for (let j = 0; j<3;j++){
    result += Number.charAt(Math.floor(Math.random() * NumberLength)); 
  }
  return result;
}
//เช็คชื่อนามสกุล
const CheckLetter = (input) => { 
      let Check = /^[A-Za-z]+$/;
      let text = input;
      let result = text.match(Check) ?  true : false;
      return result;
}

exports.create = async (input_data) => {
  let response = {};
  try {
    const {firstname, lastname, age } = input_data;
    console.log("Inputdata" , input_data)
    //Generate ID 
    const id = await GenerateID();
    console.log("ID" , id)
    // เช็คว่า id ไม่ซ้ำกับที่มีอยู่
    const check_id = await userDB.find({ id: id });
    if (check_id != "") {
      response = { error: "ID_EXIST", data: "" };
      return response;
    }
    console.log("AGE " ,parseInt(age));
    //เช็คเงื่อนไขว่า input firstname , lastname , age ตรงกับเงื่อนไขไหม 
    if ((typeof parseInt(age) == "number" && parseInt(age) > 0) && (CheckLetter(firstname) && CheckLetter(lastname))) {
        const user = new userDB({id: id,firstname: firstname,lastname: lastname,age: age, distance:0});
        const data = await user.save();
        response = { error: "", data: data };
        return response;
      }
    else {
      response = { error: "INPUT_FAILED", data: "" };
      return response;
    }
  } catch (err) {console.log(err.message);}
};

exports.updateDistance = async (input_data) => {
  let response = {};
  try{
    const {id ,distance} = input_data
    if (parseFloat(distance) > 10 ) {
      response = {error:"INPUT_FAILED" , data: ""};
      return response
    }else {
    //หาระยะทางเดิมก่อน Update
    const user = await userDB.find({id : id});
    const distance_before = user[0].distance;
    const response_update = await userDB.findByIdAndUpdate(user[0]._id , {distance:distance_before + parseFloat(distance)} ,{useFindAndModify:false})
    // ทำการเก็บ log การอัพเดท
    const distance_log = new distanceDB({id:id , distance:parseFloat(distance) , date:new Date().getTime()})
    await distance_log.save();
    if(response_update == "") {
      response = {error:"UPDATED_FAILED" , data: ""};
      return response
    } else {
      response = {error:"" , data: response_update};
      return response
    }  
    }
  }catch(err){console.log(err.message);}
}



