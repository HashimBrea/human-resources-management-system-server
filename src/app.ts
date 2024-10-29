import express from "express";
import bodyParser from "body-parser";
import { initializeDatabase } from "./config/database";
import "./models/associations";
import createPermissions from "./seeders/createPermissions";
import createRoles from "./seeders/createRoles";
import grantPermissionsToRoles from "./seeders/grantPermissionsToRoles";
import routes from "./routes/index";
import cookieParser from "cookie-parser";
import createAdminUser from "./seeders/createAdminUser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5500"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`Server running at port ${port}`);

  try {
    await initializeDatabase();

    await createPermissions();

    await createRoles();

    await grantPermissionsToRoles();

    await createAdminUser();
  } catch (error) {
    console.log(error);
  }
});
