import jwt from "jsonwebtoken";

//user Auth middleware

const authUser = async (req, res, next) => {
  try {
    const token  = req.headers.token
    
    if (!token) {
      return res.json({
        msg: "Not authorized, login Again",
      });
    }

    const dtoken = jwt.verify(token,process.env.JWT_SECRET)
    req.body.userId = dtoken.id;
     

    next()

  } catch (e) {
    console.log("Error is ocurring in auth Admin" + e);
  }
};

export default authUser ;
