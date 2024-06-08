// const express = require('express');
// const router = express.Router();
// const catchAsync = require('../utils/catchAsync');
// const Campground = require('../models/campground');
// const mongoose = require('mongoose');
// const flash = require('connect-flash');
// const { isLoggedIn, isAuthor, validateCampground } = require('../middleware.js');
// const campgrounds = require('../controllers/campground')
// const multer = require('multer');
// const { storage } = require('../cloudinary');
// const upload = multer({ dest: '../uploads/' });


// router.route('/')
//   .get(catchAsync(campgrounds.index))
//   // .post(isLoggedIn
//   //   , validateCampground, catchAsync(campgrounds.createCampground))
//   .post(upload.single("image"), (req, res) => {
//     res.send({
//       body: req.body,
//       file: req.file
//     })
//   })

// router.get('/new', isLoggedIn, campgrounds.renderNewForm)

// router.route('/:id')
//   .get(catchAsync(campgrounds.showCampground))
//   .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
//   .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))


// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))



// module.exports = router;


const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware.js');
const campgrounds = require('../controllers/campground');
const multer = require('multer');
const { storage } = require('../cloudinary');

// Use Multer's local storage instead of Cloudinary for testing
const upload = multer({ storage });

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
