import express from "express";
import constants from "./config/constants";
import "./config/database";
import middlewareConfig from "./config/middleware";
import userRoutes from "./modules";
import path from "path";
const app = express();

middlewareConfig(app);

userRoutes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public/"));
  app.get("*", (req, res) => {
    const dir = path.resolve(__dirname, "public", "index.html");
    res.sendFile(dir);
  });
}
app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
            Server is running on port: ${constants.PORT}

            ----Running on ${process.env.NODE_ENV}
            
            ----Make something great!`);
  }
});
