import { Router } from "express";
import * as billingController from "./billing.controller";
import { authJwt } from "../../services/auth/auth.services";

const routes = new Router();

routes.post("/load", authJwt, billingController.loadAmount);

routes.get("/", authJwt, (req, res) =>
  res.json({
    MEssage: "You have passed the auth"
  })
);

export default routes;
