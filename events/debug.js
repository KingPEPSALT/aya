const chalk = require('chalk')
module.exports = {
    name: 'debug',
    execute(debug_msg, client){
        console.log(chalk.blue('[DEBUG] '), debug_msg);
    }
}