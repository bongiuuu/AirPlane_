'use strict';
class CategorySchema {
    getSchema(DataTypes) {
        return {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            techId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'tech_id'
            },
            modelNo: {
                type: DataTypes.STRING,
                allowNull: false,
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
            },
            createdBy: {
                type: DataTypes.STRING,
                field: 'created_by'
            }
        };
    }
}
module.exports = new CategorySchema();