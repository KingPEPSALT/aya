module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        user_id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        experience:{
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull: false,
        },
        last_message_time:{
            type: DataTypes.DATE(6),
            allowNull: true
        }
    }, {
        timestamps: false,
    });
}