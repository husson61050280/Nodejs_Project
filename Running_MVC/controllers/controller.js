//Controller 
const { findTopTen , find , findWinner ,updateDistance, create } = require('../models/model');

exports.HomePage = (req,res) => {
    res.render("index.ejs")
}
exports.addPage = (req,res) => {
    res.render("add_user" , {message: ""})
}
exports.addDistancePage = async (req,res) => {
    const response = await find();
    res.render("add_distance" , {message: "" , users:response})
}

exports.getUserTopTen = async (req,res) => {
    try {
        const response = await findTopTen();
        res.status(200).render("show_user" , {users:response})
    }
    catch(err) { res.status(500).send({message:"Server Error in GetData "})}
}

exports.getUserWin = async (req,res) => {
    try {
        const response = await findWinner();
        console.log("UserWIn" , response)
        res.status(200).render("show_winner" , {users:response})
    }
    catch(err) { res.status(500).send({message:"Server Error in GetData "})}
}

exports.createUser = async (req,res) => {
    try {
        const {firstname , lastname , age} = req.body;
        if (firstname == "" || lastname == "" || age == "") { throw "INPUT_ERROR" }
        else {
            const {error , data } = await create(req.body);
            if(error) throw error;
            else { res.redirect("/"); }         
        }
    }catch(err) {
        if(err == "INPUT_ERROR"){ res.status(401).render("add_user.ejs" , {message:"Please fill all input."});}
        else if (err == "ID_EXIST") { res.status(401).render("add_user.ejs" , {message:"ID already used."});}
        else if (err == "INPUT_FAILED") { res.status(401).render("add_user.ejs" , {message:"You Input don't match rule."});}
    }
}
exports.addDistance = async (req,res) => {
    try{
        const {id , distance} = req.body;
        if(id == "" || distance == ""){ throw "INPUT_ALL";}
        else {
            const {error , data} = await updateDistance(req.body)
            if(error) throw error;
            else { res.status(200).redirect('/'); }
        }   
    }catch(err){
        const response = await find();
        if(err == "INPUT_ALL") {
            res.status(401).render("add_distance" , {message:"Please Fill all input" , users:response})
        }
        else if (err == "INPUT_FAILED") { res.status(401).render("add_distance.ejs" , {message:"You Input don't match rule." , users:response});}
        else if (err == "UPDATED_FAILED") {res.status(500).render("add_distance" , {message:"Server updated Fail" ,users:response})}
        console.log(err.message)
    }
}

