const mongoose = require('mongoose');
const app = require('./app')
// Connect to the test database
beforeAll(async () => {
  if(mongoose.connection.readyState===0){
    await mongoose.connect('mongodb://127.0.0.1:27017/ecom_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

// Clear the database before each test
beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

module.exports=app;