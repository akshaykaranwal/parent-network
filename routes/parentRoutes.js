// routes/parentRoutes.js
const express = require('express');
const Parent = require('../models/parent');
const Child = require('../models/Child');
const Circle = require('../models/Circle');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { fatherName, parentPhoneNumber, password, childId } = req.body;

        const child = await Child.findById(childId).populate('circles');
        if (!child) {
            return res.status(404).json({ message: 'Child not found' });
        }

        const newParent = new Parent({
            fatherName,
            parentPhoneNumber,
            password,
            child: child._id,
            circles: child.circles.map(circle => circle._id)
        });
        await newParent.save();

        await Promise.all(child.circles.map(circle =>
            Circle.findByIdAndUpdate(circle._id, { $addToSet: { members: newParent._id } })
        ));

        res.status(201).json({ message: 'Parent registered successfully', parentId: newParent._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
