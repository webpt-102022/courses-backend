const router = require('express').Router();
const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /courses
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    next(error)
  }
});

// @desc    Get one course
// @route   GET /courses/:courseId
// @access  Public
router.get('/:courseId', async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    res.status(200).json(course);
  } catch (error) {
    next(error)
  }
});

// @desc    Create one course
// @route   POST /courses
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    next(error)
  }
});

// @desc    Edit one course
// @route   PUT /courses/:courseId
// @access  Public
router.put('/:courseId', async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const response = await Course.findByIdAndUpdate(courseId, req.body, { new: true });
    console.log(response)
    //res.redirect(`/courses/${courseId}`) ==> only to see on Postman if we edited right
    res.status(204).json({ message: 'OK' });
  } catch (error) {
    next(error)
  }
});

// @desc    Delete one course
// @route   DELETE /courses/:courseId
// @access  Public
router.delete('/:courseId', async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    res.status(200).json(deletedCourse);
  } catch (error) {
    next(error)
  }
});

module.exports = router;