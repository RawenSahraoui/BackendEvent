const express = require('express');
const Comment = require('../models/comment');
const router = express.Router();
// Route pour gérer les commentaires
router.post('/', async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    const newComment = new Comment({ name, email, comment });
    await newComment.save();
    res.status(201).send(newComment);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get('/', async (req, res) => {
    try {
      const comments = await Comment.find();
      res.status(200).send(comments);
    } catch (error) {
      res.status(500).send(error);
    }
});
module.exports = router;