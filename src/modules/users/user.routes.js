import { Router } from 'express';
import * as userController from './user.controllers';
import userValidation from './user.validations';
import validate from 'express-validation'
const routes = new Router();
routes.post('/signup', validate(userValidation.signup), userController.signUp);
// routes.get('/getuser', userController.getUser);
export default routes;