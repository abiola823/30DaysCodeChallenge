import userModel from "../Model/model.js";


const homepage = (req, res) => {
    res.send("Welcome to the 30 days of the code challenge");
};

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;//object destructuring
        const exist = await userModel.findOne({email});
            if(exist){
                return res.status(403).send('User exists');
            } else {
                const create = await userModel.create({
                    username, 
                    email,
                    password // password has been hashed in the schema file before saving to database
                })
               return res.status(201).json({userDetails: create})
            }
       
    } catch (error) {
        console.log(error);
    }
   
}
const updateUser = async (req, res) => {
    try {
       const upd = await userModel.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }, {new: true});
        if (upd)  return res.json({updatedUser: upd}); 
    } catch (error) {
        console.log(error);
    }
}
const deleUser =  async (req, res)=>{
    const del = await userModel.findByIdAndDelete({_id: req.params.user});

   if(del) {res.status(200).json({
        message: 'User deleted successfully'
    });
   } else{res.send('user does not exist')}
}

const getAllUsers = async (req,res) => {
    res.json({allUsers: await userModel.find()})
}

export {
    homepage,
    registerUser,
    updateUser,
    deleUser,
    getAllUsers

}