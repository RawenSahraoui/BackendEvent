const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const registrationValidation = require('../validation/registrationvalidation');
// GetAll
router.get('/', async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GetById
router.get('/:id', async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);
        if (!registration) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json(registration);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// CreateNew
router.post('/', async (req, res) => {
    try {
        // Valider les données de la requête
        const { error } = registrationValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Extraire les données de la requête
        const { nomprenom, email, phone, teamname, skills, message } = req.body;

        // Créer un nouvel objet de données à enregistrer
        const newRegistration = new Registration({ 
            nomprenom, 
            email, 
            phone, 
            teamname, 
            skills, 
            message 
        });

        // Enregistrer les données dans la base de données
        await newRegistration.save();

        // Répondre avec les données enregistrées
        res.status(201).json(newRegistration);
    } catch (err) {
        // Gérer les erreurs
        console.error(err);
        res.status(500).json({ error: "Une erreur est survenue lors de l'enregistrement des données." });
    }
});


router.put('/:id', async (req, res) => {
    const { error } = registrationValidation.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updatedRegistration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedRegistration) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json(updatedRegistration);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deletedRegistration = await Registration.findByIdAndDelete(req.params.id);
        if (!deletedRegistration) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json({ message: 'Registration deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
