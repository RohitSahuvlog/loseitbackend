require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connection = require("./config/db");

const SignUpControl = require("./controls/SignUp.control");
const loginControl = require("./controls/Login.control");

// const userFoodRoutes = require("./controllers/userFood.controller");
// const exerciseRoutes = require("./controllers/userExercise.controller");
const userFoodRoutes = require("./controls/userFood.controller");
const exerciseRoutes = require("./controls/userExercise.controller");
const userRoutes = require("./controls/user.control");

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

app.get("/", (req,res)=>{
  res.send("Backend link add")
});

app.post("/signup", SignUpControl);

app.post("/login", loginControl);

app.use("/userfood", userFoodRoutes);
app.use("/userexercise", exerciseRoutes);

app.listen(port, async () => {
  try {
    await connection;
    console.log("connnection established");
  } catch (e) {
    console.log(e);
  }

  console.log(`server started on port ${port}`);
});
