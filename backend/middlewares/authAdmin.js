import jwt from "jsonwebtoken";

//admin Auth middleware

const authAdmin = async (req, res, next) => {
  try {
    const atoken  = req.headers.atoken
    if (!atoken) {
      return res.json({
        msg: "Not authorized, login Again",
      });
    }

    const dtoken = jwt.verify(atoken,process.env.JWT_SECRET)
    if(dtoken!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        return res.json({
            msg: "Not authorized, login Again",
          });
    }
    next()

  } catch (e) {
    console.log("Error is ocurring in auth Admin" + e);
  }
};

export default authAdmin;