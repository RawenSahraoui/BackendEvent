const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    nomprenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    teamname: { type: String },
    skills: { type: String, required: true },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', RegistrationSchema);
