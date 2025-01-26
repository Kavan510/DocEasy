import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailibility = async (req, res) => {
    try {
        const { docId } = req.body;
        // console.log("From backend:"+docId)
        // Find the doctor by ID
        const docData = await doctorModel.findById(docId); // Directly fetch the document

        // Toggle the availability
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });

        // Respond with success
        res.json({
            success: true,
            msg: "Availability changed",
        });
    } catch (e) {
        console.error("Error changing availability:", e);

        // Respond with a 500 status for server errors
        res.status(500).json({
            success: false,
            msg: "An error occurred while changing the availability of the doctor",
        });
    }
};


const doctorList = async (req,res)=>{
    try{
        const doctors =  await doctorModel.find({}).select(['-email','-password'])

        res.json({success:true,doctors})



    }
    catch(e){

    }
}

//api for doctor login

const loginDoctor = async (req,res)=>{
    try{
        const {email,password} = req.body
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,msg:"Doctor not found"})

        }

        const isMatch = await bcrypt.compare(password,doctor.password)
        if(!isMatch){
            return res.json({success:false,msg:"Incorrect password"})
        }

        const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET)
        res.json({success:true,token})

    }
    catch(e){
        res.json({success:false,msg:"An error occured while logging in"})
    }
}

//api for all appointments for specific doctor

const appointmentsDoctor = async (req,res)=>{
    try{
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})
       res.json({success:true,appointments})


    }
    catch(e){
        res.json({success:false,msg:"An error occured while fetching appointments"})
    }
}


//api for appointment completion

const appointmentComplete = async (req,res)=>{
    try{
        const {docId,appointmentId} = req.body
       const appointmentData =  await appointmentModel.findById(appointmentId)
       if(appointmentData && appointmentData.docId === docId){
           await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})   
           res.json({success:true,msg:"Appointment completed"})
         }
         else{
             return res.json({success:false,msg:"Invalid data"})
         }
    }
    catch(e){
        res.json({success:false,msg:"An error occured while completing appointment"})
    }
}

//api for appointment cancel

const cancelAppointment = async (req,res)=>{
    try{
        const {docId,appointmentId} = req.body
       const appointmentData =  await appointmentModel.findById(appointmentId)
       if(appointmentData && appointmentData.docId === docId){
           await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})   
           res.json({success:true,msg:"Appointment Cancelled"})
         }
         else{
             return res.json({success:false,msg:"Invalid data"})
         }
    }
    catch(e){
        res.json({success:false,msg:"An error occured while completing appointment"})
    }
}

//api to get dashboard data

const doctorDashboard = async (req,res)=>{  

    try{
        const {docId} = req.body;

        const appointments= await appointmentModel.find({docId}) 

        let earning = 0;
        appointments.map((item)=>{

            if(item.isCompleted || item.payment){
                earning = earning + item.amount

            }
        })

        let patients =[]
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })
        const dashData = {
            earning,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})

    }catch(e){
        res.json({success:false,msg:"An error occured while fetching dashboard data"})
    }
}


//api for get doctor profile

const doctorProfile = async (req,res)=>{    
    try{
        const {docId} = req.body
        const ProfileData = await doctorModel.findById(docId).select(['-password'])
        res.json({success:true,ProfileData})

    }
    catch(e){
        res.json({success:false,msg:"An error occured while fetching doctor profile"})
    }
}

// to update the profile

const updateProfile = async (req,res)=>{    
    try{
        const {docId,fees,address,available} = req.body
        
       const updateDoc =  await doctorModel.findByIdAndUpdate(docId,{fees,address,available})

       if (!updateDoc) {
        return res.status(404).json({ success: false, msg: "Doctor not found" });
      }
        res.json({success:true,msg:"Profile updated"})

    }
    catch(e){
        res.json({success:false,msg:"An error occured while updating doctor profile"})
    }
}


export {doctorProfile,updateProfile,doctorDashboard,cancelAppointment,appointmentComplete,changeAvailibility,doctorList,loginDoctor,appointmentsDoctor}