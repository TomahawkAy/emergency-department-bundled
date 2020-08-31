let mongoose = require('mongoose');
let Staff = require('../../models/HRH/Staff');
let bcrypt = require('bcrypt');

module.exports = {
    newStaff: (staff, callback) => {
        let stf = new Staff(staff);
        stf.save(stf, callback);
    },
    removeStaff(_id) {
        return Staff.deleteOne({user: _id});
    }
};
