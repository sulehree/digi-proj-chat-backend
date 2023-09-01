const express = require("express");
const dotenv= require("dotenv") // to Use env variable we require it
const { chats } = require("./data/data");
dotenv.config(); // Once in the Whole project,to load the env Variables we have to call this config
 
const PORT = process.env.PORT || 5000;

const app = express();

app.listen(
  PORT,
  console.log(`Express Server is listening on ${PORT}`)
);

app.get("/", (req, res) => {

  res.send("Welcome to Chats");
});
app.get("/api/chat", (req, res) => {
  console.log(req);
    res.send(chats);

})
app.get("/api/chat/:id", (req, res) => {
  
  console.log(req.params.id)
    const singlechat = chats.find((c) => c._id === req.params.id)
  res.send(singlechat);

});