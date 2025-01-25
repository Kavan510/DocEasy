import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'


//api to register user

const registerUser = async (req,res)=>{
    try{
const {name,email,password} = req.body
if(!name || !email || !password) {
    return res.json({
        success:false,
        msg:"Missing details"
    })
}

if(!validator.isEmail(email)) {
    return res.json({success:false,msg:"Email is not valid"})
}

if(password.length<8 ){
    return res.json({success:false,msg:"enter a strong password"})

}

const salt = await bcrypt.genSalt(10)
const hashPass  = await bcrypt.hash(password,salt)

const userData = {
    name,
    email,
    password:hashPass
}

const newUser = new userModel(userData)
const user = await newUser.save()

const token= jwt.sign({id:user._id},process.env.JWT_SECRET)
res.json({
    success:true,
    token:token
})
    }
    catch(e){
console.log(e)
res.json({
    success:false,
    msg:e
})
    }
}



//API for userLogin
const userLogin = async (req,res)=>{
try{

    const {email,password} = req.body

    const user = await userModel.findOne({email})
    if(!user) {
        return res.json({success:false,msg:"User does not exist"})
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(isMatch){
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({
            success:true,
            token:token
        })
    }
    else{
        return res.json({success:false,msg:"Invalid credentials"})
    }



}catch(e){
    console.log(e)
res.json({
    success:false,
    msg:e
})
}


}

//API for user profile data


const getProfile = async (req,res)=>{
    try{
        const {userId} = req.body;

        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true,data:userData})

    }
    catch(e){
        return res.json({success:false,msg:"No profile found"})
    }

}

//api to update userprofile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        // Validate input
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, msg: "Data is missing" });
        }

        // Parse address only if it's a string
        let parsedAddress;
        if (typeof address === "string") {
            try {
                parsedAddress = JSON.parse(address);
            } catch (e) {
                return res.json({ success: false, msg: "Invalid address format" });
            }
        } else {
            parsedAddress = address; // Use it directly if it's already an object
        }

        // Update the user profile fields
        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: parsedAddress,
            dob,
            gender,
        });

        // Handle image upload if an image is provided
        if (imageFile) {
            // Upload image to Cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageUrl = imageUpload.secure_url;

            // Update the user's image field
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        res.json({ success: true, msg: "Profile updated" });
    } catch (e) {
        console.error("Error updating profile:", e);
        return res.json({ success: false, msg: "Failed to update profile" });
    }
};



export {registerUser,userLogin,getProfile,updateProfile}