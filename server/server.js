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
<<<<<<< HEAD
  origin: "https://gig-swap-hsp-client.vercel.app",
=======
<<<<<<< HEAD
  origin: "https://gig-swap-hsp-client.vercel.app",
=======
  origin: "https://gig-swap-hsp-frontend.vercel.app",
>>>>>>> 75913bea62488062815fa5c727bde8148a3d0307
>>>>>>> dca425338984e42e6e57a4df70969c15455845aa
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
