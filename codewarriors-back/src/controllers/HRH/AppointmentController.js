const AppointmentModel=require('../../models/HRH/Appointment');

module.exports={
    markAppointment:(appointment)=>{
        let saved=new AppointmentModel(appointment);
        return saved.save(appointment);
    },
    deleteAppointment:(appointment)=>{
        return AppointmentModel.remove({_id:appointment._id});
    },
    getAppointments:()=>{
        return AppointmentModel.find({});
    },
    findAppointmentsByDate:(date)=>{
        return AppointmentModel.find({date:date});
    },
};
