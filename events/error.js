module.exports = {
    name:'error',
    execute(error_msg, client){
        console.error(chalk.redBright('[ERROR] '), error_msg);
    }
}