'use strict';
class CartItemSchema {
    getSchema(DataTypes) {
        return {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            registrationNo: {
                allowNull: false,
                type: DataTypes.STRING,
                field: 'registration_no'
            },
            faaNo: {
                allowNull: false,
                type: DataTypes.STRING,
                field: 'faa_no'
            },
            days: {
                defaultValue: 1,
                type: DataTypes.INTEGER,
                field: 'days'
            }, 
            hours: {
                defaultValue: 1,
                type: DataTypes.INTEGER,
                field: 'hours'
            }, 
            isDeleted: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: 0
            }
        };
    }
}
module.exports = new CartItemSchema();