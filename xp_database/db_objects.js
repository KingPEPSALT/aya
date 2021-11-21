const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host:'localhost',
    dialect:'sqlite',
    logging:false,
    storage:'database.sqlite'
});

const User = require('./models/user')(sequelize, Sequelize.DataTypes);

User.prototype.addXP = async function(experience){
    this.experience += experience;
    return this.save();

}

User.prototype.getExperience = function(){
    return this.experience;
}

User.prototype.getLastMessage = function(){
    return this.last_message_time;
}
User.prototype.setLastMessageTime = async function(last_message_time){
    this.last_message_time = last_message_time
    return this.save();
}
module.exports = User;