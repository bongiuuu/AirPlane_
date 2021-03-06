'use strict';
class CarsSchema {
    getSchema(DataTypes) {
        return {
        
            modelNo: {
                primaryKey: true,
                type: DataTypes.STRING,
                field: 'model_no'
            },
            capacity: {
                type: DataTypes.INTEGER,
                field: 'capacity'
            },
            weight: {
                type: DataTypes.INTEGER(11),
                field: 'weight'
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
module.exports = new CarsSchema();