// const express = require('express');
// const router = express.Router({ mergeParams: true });
// const catchAsync = require('../utils/catchAsync');
// const ExpressError = require('../utils/ExpressError');
// const Campground = require('../models/campground');
// const mongoose = require('mongoose');
// const { campgroundSchema, reviewSchema } = require('../schemas.js');
// const Review = require('../models/review');
// const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
// const reviews = require('../controllers/reviews')


// router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))



// router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
//   const { id, reviewId } = req.params;
//   await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
//   await Review.findByIdAndDelete(reviewId);
//   req.flash('success', 'Review deleted successfully')
//   res.redirect(`/campgrounds/${id}`);
// }));

// module.exports = router;

const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;