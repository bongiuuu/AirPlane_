'use strict';
class BannerSchema {
    getSchema(DataTypes) {
        return {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            },
            phone: {
                type: DataTypes.STRING,
                field: 'phone'
            },
            address: {
                type: DataTypes.STRING,
                field: 'address'
            },
            salary: {
                defaultValue: 1,
                type: DataTypes.INTEGER,
                field: 'salary'
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