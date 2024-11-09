// routes/childRoutes.js
const express = require('express');
const Child = require('../models/Child');
const Circle = require('../models/Circle');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { childName, schoolId, childSchool, childClass, childSection, address } = req.body;

        const newChild = new Child({
            childName,
            schoolId,
            childSchool,
            childClass,
            childSection,
            address,
            circles: []
        });

        await newChild.save();

        // Create default circles for the child
        await createDefaultCircle(newChild);

        res.status(201).json({ message: 'Child registered successfully', childId: newChild._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

const createDefaultCircle = async (user) => {
    const schoolCircle = await Circle.findOneAndUpdate(
        { name: user.childSchool, type: "school" },
        { name: user.childSchool, type: "school" },
        { upsert: true, new: true }
    );
    await Circle.findByIdAndUpdate(schoolCircle._id, { $addToSet: { members: user._id } });

    const classCircle = await Circle.findOneAndUpdate(
        { name: `${user.schoolId} - Class ${user.childClass}`, type: 'class' },
        { name: `${user.schoolId} - Class ${user.childClass}`, type: 'class' },
        { upsert: true, new: true }
    );
    await Circle.findByIdAndUpdate(classCircle._id, { $addToSet: { members: user._id } });

    const sectionCircle = await Circle.findOneAndUpdate(
        { name: `${user.schoolId} - Section ${user.childSection}, Class ${user.childClass}`, type: 'section' },
        { name: `${user.schoolId} - Section ${user.childSection}, Class ${user.childClass}`, type: 'section' },
        { upsert: true, new: true }
    );
    await Circle.findByIdAndUpdate(sectionCircle._id, { $addToSet: { members: user._id } });

    
    if (user.address) {
        const addressCircle = await Circle.findOneAndUpdate(
            { name: user.address, type: 'address' },
            { name: user.address, type: 'address' },
            { upsert: true, new: true }
        );
        await Circle.findByIdAndUpdate(addressCircle._id, { $addToSet: { members: user._id } });

        const combinedCircle = await Circle.findOneAndUpdate(
            { name: `${user.address}, ${user.schoolId}`, type: 'combined' },
            { name: `${user.address}, ${user.schoolId}`, type: 'combined' },
            { upsert: true, new: true }
        );
        await Circle.findByIdAndUpdate(combinedCircle._id, { $addToSet: { members: user._id } });
    }
    user.circles.push(schoolCircle._id, classCircle._id, sectionCircle._id);
    await user.save();
}
module.exports = router;
