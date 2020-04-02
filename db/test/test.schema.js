'use strict';
class BannerSchema {
    getSchema(DataTypes) {
        return {
    
            faaNo: {
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                field: 'faa_no'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            },
            maxScore: {
                defaultValue: 1,
                type: DataTypes.INTEGER,
                field: 'max_score'
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
                allowNull: true,
                type: DataTypes.DATE,
                field: 'created_date'
            },
            createdBy: {
                allowNull: true,
                type: DataTypes.STRING,
                field: 'created_by'
            }
        };
    }
}
module.exports = new BannerSchema();