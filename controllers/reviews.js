
// const Review = require('../models/review');
// const Campground = require('../models/campground');

// module.exports.createReview = async (req, res) => {
//   const campground = await Campground.findById(req.params.id);
//   const review = new Review(req.body.review);
//   review.author = req.user._id;
//   campground.reviews.push(review);
//   await review.save();
//   await campground.save();
//   req.flash('success', 'Created review successfully!')
//   res.redirect(`/campgrounds/${campground._id}`)
// }

// module.exports.deleteReview =

const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash('success', 'Created new review!');
  res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  console.log("Hit the delete review point!!!");
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted review')
  res.redirect(`/campgrounds/${id}`);
}