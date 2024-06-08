
const mongoose = require('mongoose');
const axios = require('axios');
const cities = require('./cities');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

// async function seedImg() {
//   try {
//     const resp = await axios.get('https://api.unsplash.com/photos/random', {
//       params: {
//         client_id: '588137',
//         collections: 1114848,
//       },
//     })
//     return resp.data.urls.small
//   } catch (err) {
//     console.error(err)
//   }
// }

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '666033719f076dcfaee93dba',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: 'https://placeimg.com/',
      // image: 'https://source.unsplash.com/random/?camping',

      // image: 'https://source.unsplash.com/collection/483251',

      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex quod officiis perspiciatis beatae, doloribus officia ipsa dicta voluptatem fugiat quae cum expedita nulla ea eligendi aut et animi eum culpa',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dyyeuhnfn/image/upload/v1717827740/YelpCamp/qaka2ihxuvekonvicsv9.jpg',
          filename: 'YelpCamp/qaka2ihxuvekonvicsv9',
        },
        {
          url: 'https://res.cloudinary.com/dyyeuhnfn/image/upload/v1717827740/YelpCamp/hczmvg3nxoyjo8ileina.jpg',
          filename: 'YelpCamp/hczmvg3nxoyjo8ileina',

        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})