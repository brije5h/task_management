const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/sign-in", async(req,res)=>{
    try{
        const { username, email } = req.body;

        const existingUserOrEmail = await User.findOne({
            $or: [{ username: username }, { email: email }]
        });
        if (existingUserOrEmail) {
            if (existingUserOrEmail.username === username) {
                return res
                .status(300)
                .json({ message: "Username already exists" });
            } else if (existingUserOrEmail.email === email) {
                return res
                .status(300)
                .json({ message: "Email already exists" });
            }
        } else if(username.length < 4){
            return res
            .status(409)
            .json({message: "Username should have atleast 4 characters"})
        }

        const hashedPassword = await bcrypt.hash(req.body.password,10);

        const newUser = new User({
            username:req.body.username, 
            email:req.body.email,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(201 ).json({message:"New user successfully signed up!"});
    } catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
});

router.post("/login", async(req,res)=>{

    try{
        const { username,password } = req.body;
        const existingUser = await User.findOne({ username });
        if(!existingUser){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        bcrypt.compare(password, existingUser.password,(err, data)=>{
            if(err){
                console.log(err);
                res.status(400).json({message:"Error comparing passwords"});
            }
            if(data){
                const authClaims = [{name:username},{jti:jwt.sign({}, "tcmTM")}]
                console.log(`${username}logged in`)
                const token = jwt.sign({authClaims},"tcmTM",{expiresIn:"1d"});
                res.status(200).json({message:"User successfully Logged in...", id: existingUser._id ,token:token});
            }
            else{
                return res
                .status(400)
                .json({message:"Invalid Credentials"});
            }
        });
    } catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"})
    }

});

module.exports = router;