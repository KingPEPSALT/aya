
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('worker', {
        user_id: DataTypes.STRING,
        item_id: DataTypes.STRING,
        amount:{
            type: DataTypes.INTEGER,
            'default': 0,
            allowNull: false
        },
        perSecond:{
            type: DataTypes.INTEGER,
            allowNull:false
        }

    })
}