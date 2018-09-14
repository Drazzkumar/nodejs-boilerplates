import { Router } from "express";
import * as userController from "./user.controllers";
import userValidation from "./user.validations";
import validate from "express-validation";
import { authLocal, authJwt } from "../../services/auth/auth.services";

const routes = new Router();

routes.post("/signup", validate(userValidation.signup), userController.signUp);
// routes.get('/getuser', userController.getUser);

routes.post("/login", authLocal, userController.login);
routes.get("/profile", authJwt, userController.profile);
// routes.post("/")
export default routes;
