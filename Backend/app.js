const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn")
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");

app.use(cors());
app.use(express.json());
//localhost:8000/api/v1/UserAPI
app.use("/api/v1",UserAPI);

//localhost:8000/api/v2/TaskAPI
app.use("/api/v2",TaskAPI);


app.use("/", (req, res) => {
    res.send("Hello from backend side!");
});

const PORT = 8000;

app.listen(PORT, ()=>{
    console.log("Server started");
})