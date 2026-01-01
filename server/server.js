require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute=require("./router/contact-router");
const serviceRoute=require("./router/service-router");
const adminRoute =require("./router/admin-router");
const connectDb=require("./utils/db");
const errorMiddleware=require ("./middlewares/error-middleware");



const corsOptions = {
  origin: "https://gig-swap-hsp-client.vercel.app",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));



app.use(express.json()); //middleware

app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);

// lets define admin route
app.use("/api/admin",adminRoute);
app.use(errorMiddleware);

// app.get("/", (req, res) => {
//   res.status(200).send("Welcome to Home");
// });

// app.get("/register", (req, res) => {
//   res.status(200).send("Registration");
// });

const PORT= process.env.PORT || 8000;



connectDb().then(()=>{
app.listen(PORT,()=>{
  console.log(`server is listening on port: ${PORT}`);
});
});
