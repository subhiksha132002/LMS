import User from "../model/userSchema.js";

export const authenticate = async (req,res,next) => {
    try{
        const token = req.headers["authorization"];
        if(!token) return res.status(403).json({message:"No token provided"});

        const user = await User.findOne({token});
        if(!user) return res.status(403).json({message:"Invalid token"});

        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({message:"Authentication failed"});
    }
}