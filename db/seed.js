require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Course = require('../models/Course');

const courses = [
  {
    "title": "Web development 4 everyone",
    "image": "https://www.aptech.net.in/images/course/full/web-development-training.jpg",
    "description": "Become a true and honest console.logger while learning the latest technologies on fullstack development",
    "price": 50,
    "hasDiscount": false,
    "type": "in person"
  },
  {
    "title": "UX/UI: charm everyone with your designs",
    "image": "https://i.pinimg.com/736x/45/9f/4f/459f4fa5f46eb961b390e55d823dcea3--design-blogs-ux-design.jpg",
    "description": "The course might involve a huge amount of breakfasting.",
    "price": 60,
    "hasDiscount": true,
    "type": "in person"
  },
  {
    "title": "Cybersecurity",
    "image": "https://cdn.mindmajix.com/courses/cyber-security-training.png",
    "description": "Be able to scare everyone about hacking their instagram accounts in just 9 weeks",
    "price": 90,
    "hasDiscount": true,
    "type": "remote"
  },
  {
    "title": "Data analytics",
    "image": "https://njbmagazine.com/wp-content/uploads/2021/06/Data_301985997-775x500.gif",
    "description": "Learn Python while crunching some interesting and scary numbers",
    "price": 40,
    "hasDiscount": false,
    "type": "remote"
  }
]

mongoose
  .connect(process.env.MONGO_URL)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .then(() => {
    return Course.deleteMany({})
  })
  .then(() => {
    return Course.create(courses)
  })
  .then((created) => {
    console.log(`Created ${created.length} courses`)
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  })
  .finally(() => {
    mongoose.connection.close()
  })