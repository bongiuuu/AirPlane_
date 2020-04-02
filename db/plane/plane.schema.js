'use strict';
class ReservationSchema {
    getSchema(DataTypes) {
        return {
    
            registrationNo: {
                primaryKey: true,
                type: DataTypes.STRING,
                field: 'registration_no'
            },
            modelNo: {
                type: DataTypes.STRING,
                field: 'model_no'
            },
            priority: {
                defaultValue: 1,
                type: DataTypes.INTEGER,
                field: 'priority'
            },
            isDeleted: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: 0
            },  
            createdDate: {
                defaultValue : new Date(),
                type: DataTypes.DATE,
                field: 'created_date'
            }
        };
    }
}
module.exports = new ReservationSchema();