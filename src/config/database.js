import mongoose from 'mongoose';
import constants from './constants';

// Removes th warnig with promises
mongoose.Promise = global.Promise;

//Connect the db with the given url


try {
  mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true });
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}
mongoose.connection.once('open', () => console.log("MongoDB Running")).on('error', e => {
  throw e;
})