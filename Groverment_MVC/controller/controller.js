//controller 

//import 
const Model = require("../model/model");
const model = new Model();

class Controller {

    async homePage(req,res) {
        let alluser = await model.findUser()
        res.render("index.ejs" , {users : alluser});
    }
    //get
    async addPage(req,res) {
       try {
        let allUniversity = await model.findUniversity();
        res.render("add.ejs" , {universitys : allUniversity , message:"" });
       }catch(err) {
           
       }
    }
    //post
    async addUser(req,res) {
        let {id , firstname , lastname , age , university_id} = req.body;
        if(id == "" || firstname == "" || lastname == "" || age == "" || university_id == "") {
            let allUniversity = await model.findUniversity();
            res.render("add" , {message:"Please Fill All ", universitys : allUniversity })
        }
        else {
            let result =  await model.addUser(req.body);
            if(result.error) {
                let allUniversity = await model.findUniversity();
                res.render("add" , {message:result.error, universitys : allUniversity })
            }
            res.redirect("/");
        }
    }
    //get
    addUniversityPage(req,res) {
        res.render("add_university.ejs");
    }
    //post
    async addUniversity(req,res) {
        let response = await model.addUniversity(req.body)
        res.redirect("/");
    }
}
module.exports = Controller;
