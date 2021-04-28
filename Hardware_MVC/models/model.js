const mongoose = require("mongoose");

var material_schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  type_id: {
    type: String,
    required: true,
  },
});

var type_group_schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
//สร้างตาราง วัสดุ และประเภทวัสดุ
const Materialdb = mongoose.model("material", material_schema);
const Type_groupdb = mongoose.model("type", type_group_schema);

exports.findMaterial = async () => {
  try {
    const response = await Materialdb.find();
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

exports.findType = async () => {
  try {
    const response = await Type_groupdb.find();
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

//การจัดกลุ่มโดยแสดง type ทั้งหมดตามด้วยจำนวนรายการวัสดุ
exports.GroupByType = async () => {
  try {
    let response = await Materialdb.aggregate([
      {
        $group: {
          _id: "$type_id",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "types",
          localField: "_id",
          foreignField: "id",
          as: "Typedetails",
        },
      },
    ]);
    console.log("Response Groupby", response);
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
exports.createMaterial = async (input_data) => {
  let response = {};
  try {
    const { id, name, price, total, type_id } = input_data;
    // เช็คว่า id ไม่ซ้ำกับที่มีอยู่
    const check_id = await Materialdb.find({ id: id });
    if (check_id != "") {
      response = { error: "ID_EXIST", data: "" };
      return response;
    }
    const material = new Materialdb({
      id: id,
      name: name,
      price: price,
      total: total,
      type_id: type_id,
    });
    const data = await material.save();
    response = { error: "", data: data };
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
exports.createType = async (input_data) => {
  let response = {};
  try {
    const { id, name } = input_data;
    // เช็คว่า id ไม่ซ้ำกับที่มีอยู่
    const check_id = await Type_groupdb.find({ id: id });
    if (check_id != "") {
      response = { error: "ID_EXIST", data: "" };
      return response;
    }
    const type = new Type_groupdb({ id: id, name: name });
    const data = await type.save();
    response = { error: "", data: data };
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
