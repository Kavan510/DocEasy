import jwt from "jsonwebtoken";

//doctor Auth middleware

const authDoctor = async (req, res, next) => {
  try {
    const dtoken  = req.headers.dtoken
    
    if (!dtoken) {
      return res.json({
        msg: "Not authorized, login Again",
      });
    }

    const d_token = jwt.verify(dtoken,process.env.JWT_SECRET)
    req.body.docId = d_token.id;
     

    next()

  } catch (e) {
    console.log("Error is ocurring in auth Admin" + e);
  }
};

export default authDoctor ;
