import express from 'express'
import { appointmentsDoctor, doctorList, loginDoctor,appointmentComplete,cancelAppointment,doctorDashboard,doctorProfile,updateProfile} from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoc.js'

const doctorRouter = express.Router()


doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,cancelAppointment)
doctorRouter.get('/doctor-dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateProfile)
export default doctorRouter