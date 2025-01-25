import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js' 
import jwt  from 'jsonwebtoken'
//API for adding doctor


const addDoctor=async (req,res)=>{
    try{

        const {name,email,password,speciality,degree,experience,about,fees,address} =req.body;
        const imageFile = req.file;
        // console.log({name,email,password,speciality,degree,experience,about,fees,address},imageFile);
         //checking for all data to add doctor
         
         if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address)
         {
            

            return res.json({success:false,msg:"Missing details"})
         }
         // validatin email format 
         if(!validator.isEmail(email)){
            return res.json({msg:"Email is not valid"})
         }
         // validate passwd
         if(password.length<8) {
            return res.json({msg:"Please enter a strong password"})

         }
        const salt = await bcrypt.genSalt(5)
        const hashPass = await bcrypt.hash(password,salt)
         
        // generating image url 
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
        const imageUrl = imageUpload.secure_url
         
         const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashPass,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            date:Date.now()
         }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save();
res.json({
    msg:"Doctor added"
})
    }
    catch(e){
console.log("Error is occuring in admin controller"+e);

    }
}

//API for the admin login

const loginAdmin = async (req,res)=>{
    try{
        console.log("from backend")
        console.log(req)
        const {email,password} = req.body
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

         const token = jwt.sign(email+password,process.env.JWT_SECRET)   
        res.json({
            token:token
        })


        }
        else{
            res.json({
                msg:"Invalid credentials"
            })
        }
    }
    catch(e){
        console.log("Error is occuring in admin controller"+e);
        
            }
    


}

//APi to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password'); // Fetch all doctors, excluding passwords

        res.status(200).json({  // Add a status code and proper response format
            success:true,
            doctors,
        });
    } catch (e) {
        console.error("Error in admin controller: ", e);

        res.status(500).json({  // Respond with a 500 status for errors
            success: false,
            message: "An error occurred while fetching doctors",
        });
    }
};

export {addDoctor,loginAdmin,allDoctors}