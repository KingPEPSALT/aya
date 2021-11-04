const { execute } = require("./play");

module.exports = {
    name:"dispatch",
    alias:["dp", "dpstatus", "dispatcher", "dispatcherstatus"],
    description:"Prints dispatcher to console for debug purposes.",
    async execute(msg, args){
        console.log(msg.client.queues.get(msg.guild).dispatcher);
    }
}