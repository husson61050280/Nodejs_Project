const mongoose = require("mongoose");

var schema = new mongoose.Schema({
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
  year: {
    type: String,
    required: true,
  },
});

const Studentdb = mongoose.model("studentdb", schema);

exports.find = async () => {
  try {
    const response = await Studentdb.find();
    return response;
  } catch (err) { console.log(err.message);}
};

exports.findbyId = async (id) => {
  try {
    const response = await Studentdb.find({_id:id});
    return response;
  } catch (err) {console.log(err.message);}
};

exports.create = async (input_data) => {
  let response = {};
  try {
    const { id, firstname, lastname, year } = input_data;
    // เช็คว่า id ไม่ซ้ำกับที่มีอยู่
    const check_id = await Studentdb.find({ id: id });
    if (check_id != "") {
      response = { error: "ID_EXIST", data: "" };
      return response;
    }
    //เช็คเงื่อนไขว่า input id มาถูกต้องไหม ตรงกับปีที่ระบุไหม
    if (typeof parseInt(id) == "number" && id.toString().length == 8) {
      if ((id.substring(0, 2) == "60" && year == "4") ||(id.substring(0, 2) == "61" && year == "3") ||(id.substring(0, 2) == "62" && year == "2") ||(id.substring(0, 2) == "63" && year == "1")) {
        const student = new Studentdb({id: id,firstname: firstname,lastname: lastname,year: year,});
        const data = await student.save();
        response = { error: "", data: data };
        return response;
      }
    } else {
      response = { error: "INPUT_FAILED", data: "" };
      return response;
    }
  } catch (err) {console.log(err.message);}
};

exports.update = async (input_data,id) => {
  let response = {};
  try{
    const response_update = await Studentdb.findByIdAndUpdate(id , input_data ,{useFindAndModify:false})
    if(response_update == "") {
      response = {error:"UPDATED_FAILED" , data: ""};
      return response
    } else {
      response = {error:"" , data: response_update};
      return response
    }
  }catch(err){console.log(err.message);}
}

exports.delete_student = async (id) => {
  let response = {};
  try{
    const response_delete = await Studentdb.findByIdAndDelete(id);
    if(response_delete == "") {
      response = {error:"DELETE_FAILED" , data: ""}
      return response;
    } else {
      response = {error:"" , data: response_delete}
      return response;
    }
  }catch(err){console.log(err.message);}
}

//จับคู่แข่งขันโดยมีเงื่อนไขคือชั้นปีเดียวกันแข่งกันไม่ได้ 
exports.match = async () => {
  try {
    let all_student = await Studentdb.find();
    console.log("all_student" , all_student);
    let matches = [];
    let arr = [];
    while(all_student.length > 0) {
        let n = all_student.length;
        let locate1 = Math.floor(Math.random() * n - 1) + 1;
        let locate2 = Math.floor(Math.random() * n - 1) + 1;
        if(locate1 !== locate2) {
            if(all_student[locate1].year !== all_student[locate2].year){
                arr = [all_student[locate1], all_student[locate2]];
                console.log(arr[0] ," " , arr[1])
                matches.push(arr);
                all_student = all_student.filter((e) => {
                    return e !== arr[0] && e !== arr[1];
                  });
                console.log(all_student.length)
           }
           else if (all_student.length === 2 && all_student[locate1].year == all_student[locate2].year) { break; }  
        }
    }
    console.log("Matches" , matches)
    return(matches)
  } catch (err) {console.log(err.message)}
};
