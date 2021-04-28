const {findMaterial , findType , createMaterial , createType , GroupByType}  = require("../models/model");

//HomePage
exports.homePage = async (req,res) => {
    const Allmaterial = await findMaterial();
    const Alltype = await findType();
    const Group = await GroupByType();
    console.log("Group" ,Group[0]);
    res.render("index.ejs" , {Alltype:Alltype , Allmaterial:Allmaterial , Group:Group});
}
exports.render_AddmaterialPage = async (req,res) => {
    const Alltype = await findType()
    res.render("add_material.ejs" , {message:"" , Alltype:Alltype});
}
exports.render_AddtypePage = (req,res) => {
    res.render("add_type.ejs" , {message:""});
}
exports.add_material = async(req,res) => {
    try {
        const {id ,name , price, total, type_id} = req.body;
        if (id == "" || name == "" || price == "" || total == "" || type_id == "") { throw "INPUT_ERROR" }
        else {
            const {error , data } = await createMaterial(req.body);
            if(error) throw error;
            else { res.redirect("/"); }         
        }
    }catch(err) {
        const Alltype = await findType()
        if(err == "INPUT_ERROR"){ res.status(401).render("add_material.ejs" , {message:"Please fill all input." , Alltype:Alltype });}
        else if (err == "ID_EXIST") { res.status(401).render("add_material.ejs" , {message:"ID already used.", Alltype:Alltype});}
    }
}
exports.add_type = async(req,res) => {
    try {
        const {id ,name} = req.body;
        if (id == "" || name == "" ) { throw "INPUT_ERROR" }
        else {
            const {error , data } = await createType(req.body);
            if(error) throw error;
            else { res.redirect("/"); }         
        }
    }catch(err) {
        if(err == "INPUT_ERROR"){ res.status(401).render("add_type.ejs" , {message:"Please fill all input."});}
        else if (err == "ID_EXIST") { res.status(401).render("add_type.ejs" , {message:"ID already used."});}
    }
}

