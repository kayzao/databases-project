const express = require('express');
const router = express.Router();
const Example = require('../models/testModel');

router.get('/', async (req, res) => {
  const examples = await Example.find();
  res.json(examples);
});

router.post('/', async (req, res) => {
  const example = new Example({ name: req.body.name });
  const createdExample = await example.save();
  res.status(201).json(createdExample);
});

module.exports = router;
