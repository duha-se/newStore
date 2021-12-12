const mongoose = require('mongoose');

const superSchema = mongoose.Schema({
    _id : String ,
    categId: String,
    prodcutName : Number ,
    price: String,
    img : String
}, {
    timestamps: true
});
module.exports = mongoose.model('Super', superSchema);