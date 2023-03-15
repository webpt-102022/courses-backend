const { Schema, model } = require('mongoose');

const courseSchema = new Schema(
  // Add whichever fields you need for your app
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required.'],
    },
    image: {
      type: String,
      required: [true, 'Image is required.'],
    },
    description: {
      type: String,
      required: [true, 'Description is required.']
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: 0
    },
    hasDiscount: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      enum: ['in person', 'remote'],
      default: 'remote'
    }
  },
  {
    timestamps: true
  }
);

const Course = model('Course', courseSchema);

module.exports = Course;