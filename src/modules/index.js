import userRoutes from "./users/user.routes";
import billingRoutes from "./stripe/billing.routes";
export default app => {
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/stripe", billingRoutes);
};
