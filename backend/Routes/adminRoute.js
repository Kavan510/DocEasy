import express from 'express'
import { addDoctor ,adminDashboard,allDoctors,appointmentCancel,appointmentsAdmin,loginAdmin, removeDoctor} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailibility } from '../controllers/doctorController.js';
const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availibility',authAdmin,changeAvailibility) // should use put
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel) // should use put for good practice
adminRouter.get('/dashboard',authAdmin,adminDashboard)
adminRouter.delete('/remove-doctor/:id',authAdmin,removeDoctor);

export default adminRouter
