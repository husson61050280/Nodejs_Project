const {checkIO} = require('../models/model');

exports.homePage = (req,res) => {res.render("index.ejs" , {message: ""})};

exports.generateIO = async (req,res) => {
    try{
        const {error , data} = await checkIO(req.body);
        if (error) throw error;
        else {
            res.render("show.ejs" , {Account:data})
        }
    }catch(err) {
        if(err == "INPUT_FAILED") {
            res.render("index" , {message:"Input Only a-z or A-Z"})
        }
    }
    
}



