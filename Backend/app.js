const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn")
const cors = require("cors");
const UserAPI = require("./routes/user");
app.use(cors());
app.use(express.json());
//localhost:3000/api/v1/sign-in
app.use("/api/v1",UserAPI);



app.use("/", (req, res) => {
    res.send("Hello from backend side!");
});

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log("Server started");
})