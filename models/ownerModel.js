const mongoose = require('mongoose')


const ownerSchema = mongoose.Schema({
    name: String,
    password : String,
    email: String,
    products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
      ],
})

module.exports = mongoose.model("owner",ownerSchema);