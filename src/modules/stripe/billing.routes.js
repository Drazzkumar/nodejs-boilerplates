import { Router } from "express";
import * as billingController from "./billing.controller";
import authJWT from "../../services/auth/auth.services";

const routes = new Router();

routes.post("/load", authJWT, billingController.loadAmount);

export default routes;
