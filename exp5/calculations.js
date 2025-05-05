const express = require('express');
const router = express.Router();
const Calculation = require('../models/Calculation');

// CREATE
router.post('/', async (req, res) => {
    const { operand1, operand2, operator } = req.body;
    let result;

    switch (operator) {
        case '+': result = operand1 + operand2; break;
        case '-': result = operand1 - operand2; break;
        case '*': result = operand1 * operand2; break;
        case '/': result = operand2 !== 0 ? operand1 / operand2 : null; break;
        default: result = null;
    }

    const calculation = new Calculation({ operand1, operand2, operator, result });
    await calculation.save();
    res.json(calculation);
});

// READ
router.get('/', async (req, res) => {
    const calculations = await Calculation.find();
    res.json(calculations);
});

// UPDATE
router.put('/:id', async (req, res) => {
    const { operand1, operand2, operator } = req.body;
    let result;

    switch (operator) {
        case '+': result = operand1 + operand2; break;
        case '-': result = operand1 - operand2; break;
        case '*': result = operand1 * operand2; break;
        case '/': result = operand2 !== 0 ? operand1 / operand2 : null; break;
        default: result = null;
    }

    const updated = await Calculation.findByIdAndUpdate(req.params.id, {
        operand1, operand2, operator, result
    }, { new: true });

    res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
    await Calculation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

module.exports = router;
