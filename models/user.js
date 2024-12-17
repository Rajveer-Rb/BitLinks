const {Schema, model,models} = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

// const User = model('user', userSchema);
const User = models.user || model('user', userSchema);
module.exports = User;