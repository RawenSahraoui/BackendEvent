const Registration = require('../models/Registration');
// GetAll 
const getRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// GetbyID
const getRegistrationById = async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);
        if (!registration) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json(registration);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//CreateNew
const createRegistration = async (req, res) => {
    const { nomprenom, email, phone, teamname, skills, message } = req.body;
    try {
        const newRegistration = new Registration({ nomprenom, email, phone, teamname, skills, message });
        const savedRegistration = await newRegistration.save();
        res.status(201).json(savedRegistration);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const updateRegistration = async (req, res) => {
    try {
        const updatedRegistration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedRegistration) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json(updatedRegistration);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const deleteRegistration = async (req, res) => {
    try {
        const deletedRegistration = await Registration.findByIdAndDelete(req.params.id);
        if (!deletedRegistration) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json({ message: 'Registration deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = {
    getRegistrations,
    getRegistrationById,
    createRegistration,
    updateRegistration,
    deleteRegistration
};
