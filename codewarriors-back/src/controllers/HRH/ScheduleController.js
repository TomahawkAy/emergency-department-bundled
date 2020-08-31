const Schedule = require('../../models/HRH/Schedule');
const Appointment = require('../../models/HRH/Appointment');
module.exports = {
    newSchedule: (schedule) => {
        const model = new Schedule(schedule);
        return model.save();
    },
    deleteSchedule: (_id) => {
        return Schedule.deleteOne({_id});
    },
    fetchSchedules: () => {
        return Schedule.find({});
    },
    newAppointment: (appointment) => {
        const model = new Appointment(appointment);
        return model.save();
    }
};
