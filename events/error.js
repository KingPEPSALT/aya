module.exports = {
    name:'error',
    execute(error_msg, client){
        console.error('[ERROR] ', error_msg);
    }
}