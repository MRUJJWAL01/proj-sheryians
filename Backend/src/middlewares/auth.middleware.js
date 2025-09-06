const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const authSeller = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            meg:"Unauthorized"
        })
    }
    try {
        const decode = jwt.verify(token,process.env.SECRETKEY);
        const user = await userModel.findById(decode.id);
        if(user.role !== "seller"){
            return res.status(403).json({
                msg:"Frorbidden, you do not have a required role",

            })
            
        }
        req.seller = user;
            next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"unauthorized"
        })
        
        
    }

}
const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      msg: "Unauthorized, token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    const user = await userModel.findById(decoded.id);

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      msg: "Unauthorized",
      error: error,
    });
    console.log(error);
    
  }
};

module.exports = {
    authSeller,
    authUser
    
}




