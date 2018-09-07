import express from 'express';
import constants from "./config/constants";
import './config/database';
import middlewareConfig from './config/middleware';
import userRoutes from './modules';
const app = express();
middlewareConfig(app);
app.get('/', (req, res) => {
    res.send('Hellow');
});
userRoutes(app);
app.listen(constants.PORT, err => {
    if (err) {
        throw err;
    } else {
        console.log(`
            Server is running on port: ${constants.PORT}

            ----Running on ${ process.env.NODE_ENV}
            
            ----Make something great!`);
    }
})