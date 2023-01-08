const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger.json");

const cors = require("cors");
const upload = require("./helpers/fileUpload");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//-------SWAGGER---------//
const swaggerOptions = require("./utils/swaggerOptions");
const swaggerSpec = swaggerJsdoc(swaggerOptions);

//---------Import Controllers----------//

const authController = require("./controllers/authController.js");
const carController = require("./controllers/carController");
const userController = require("./controllers/userController"); ////testttt

//-----------Import Midleware------------//
const middleware = require("./middlewares/auth");

//------------Define Routes------------//

//------------ Testing CI/CD ------------//
// app.get("/testing-ci-cd/:id", userController.getPostsByID);

// -----------Auth------------//
app.post("/auth/register", authController.register);
app.post("/auth/addAdmin", middleware.authenticate, middleware.isSuperAdmin, authController.registerAdmin);
app.post("/auth/login", authController.login);
app.get("/auth/me", middleware.authenticate, authController.currUser);

//----------- User-----------//
app.get("/users", middleware.authenticate, middleware.isSuperAdmin, userController.getAll);
app.delete("/users/:id", middleware.authenticate, middleware.isSuperAdmin, userController.deleteByID);

//-----------Car-----------//
app.get("/api/car", middleware.authenticate, carController.getAll);
app.get("/api/car/:id", middleware.authenticate, middleware.isAdmin, carController.getByID);
app.post("/api/car", middleware.authenticate, middleware.isAdmin, upload.single("photo"), carController.create);
app.put("/api/car/:id", middleware.authenticate, middleware.isAdmin, carController.updateByID);
app.delete("/api/car/:id", middleware.authenticate, middleware.isAdmin, carController.deleteByID);

//-----------API Documentation-----------//
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(process.env.PORT || 1500, () => {
  console.log(`Server berhasil berjalan di port http://localhost:${process.env.PORT || 1500}`);
});
