const { find , findbyId ,update, create , match , delete_student} = require('../models/model');

exports.addPage = (req,res) => {res.render("add_student" , {message: ""})}

exports.editPage = async (req,res) => {
    try {
        const id = req.params.id;
        const response = await findbyId(id);
        res.render("edit_student" , {message: "" , student:response})
    }
    catch(err) {console.log(err.message);}  
}
exports.getStudent = async (req,res) => {
    try {
        const response = await find();
        res.status(200).render("index" , {students:response})
    }
    catch(err) { res.status(500).send({message:"Server Error in GetData "})}
}
exports.createStudent = async (req,res) => {
    try {
        const {id ,firstname , lastname , year} = req.body;
        if (id == "" || firstname == "" || lastname == "" || year == "") { throw "INPUT_ERROR" }
        else {
            const {error , data } = await create(req.body);
            if(error) throw error;
            else { res.redirect("/"); }         
        }
    }catch(err) {
        if(err == "INPUT_ERROR"){ res.status(401).render("add_student.ejs" , {message:"Please fill all input."});}
        else if (err == "ID_EXIST") { res.status(401).render("add_student.ejs" , {message:"ID already used."});}
        else if (err == "INPUT_FAILED") { res.status(401).render("add_student.ejs" , {message:"You Input don't match rule."});}
    }
}
exports.updateStudent = async (req,res) => {
    try{
        const id = req.params.id;
        const {firstname , lastname} = req.body;
        if(firstname == "" || lastname == ""){ throw "INPUT_FAILED";}
        else {
            const {error , data} = await update(req.body, id)
            if(error) throw error;
            else { res.status(200).redirect('/'); }
        }   
    }catch(err){
        if(err == "INPUT_FAILED") {
            const response = await findbyId(req.params.id)
            res.status(401).render("edit_student" , {message:"Please Fill all input" , student:response})
        }
        else if (err == "UPDATED_FAILED") {res.status(500).render("edit_student" , {message:"Server updated Fail"})}
        console.log(err.message)
    }
}
exports.deleteStudent = async (req,res) => {
    try {
        const {error , data} = await delete_student(req.params.id);
        if(error) throw error;
        else {res.status(200).redirect('/');}
    }catch(err) {
        if(err == "DELETED_FAILED"){res.status(500).send({message:"Delete Failed"});}
        else {console.log(err.message);}
    }
}
exports.matchStudent = async (req,res) => {
    try {
        const response = await match();
        res.render('match' , {matchs:response})
    }catch(err) {console.log(err.message);}
}