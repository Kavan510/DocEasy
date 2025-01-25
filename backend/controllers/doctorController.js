import doctorModel from "../models/doctorModel.js";



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

export {changeAvailibility,doctorList}