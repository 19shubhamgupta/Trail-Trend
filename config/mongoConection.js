const mongoose = require("mongoose");
const debgr = require("debug")("development:mongoose")
const config = require('config')
mongoose
.connect(`${config.get('MONGODB_URI')}/mongo3`)
.then(()=>{
    // use command set DEBUG=development:* to activate debgr
    // to inactivate set DEBUG=
   debgr(" mongoose connected") 
})
.catch((err)=>{
    debgr(err)
})

module.exports = mongoose.connection;