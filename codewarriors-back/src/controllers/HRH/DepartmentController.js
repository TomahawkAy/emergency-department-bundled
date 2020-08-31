const DepartmentModel = require('../../models/HRH/Department');

module.exports = {
    newDepartment: (department) => {
        const Department = new DepartmentModel(department);
        return Department.save();
    },
    fetchDepartments: () => {
        return DepartmentModel.find({});
    },
    deleteDepartment: (_id) => {
        return DepartmentModel.deleteOne({_id});
    },

};
