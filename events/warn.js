const chalk = require('chalk')
module.exports = {
    name:'warn',
    execute(warn_msg, client){
        console.log(chalk.yellow('[WARN] '), warn_msg);
    }
}