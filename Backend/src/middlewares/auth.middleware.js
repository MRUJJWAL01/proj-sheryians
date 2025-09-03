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

module.exports = {
    authSeller,
}





//         req.seller = user

//         next()
//     } catch (err) {

//         console.log(err)
//         res.status(401).json({
//             message: "Unauthorized"
//         })

//     }


// }


// module.exports = {
//     authSeller
// }