const express = require("express");
const dotenv = require("dotenv"); // to Use env variable we require it
dotenv.config(); // Once in the Whole project,to load the env Variables we have to call this config
const colors = require("colors");
const DBConnect = require("./Config/DataBase");
const { chats } = require("./data/data");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000;
DBConnect();
const app = express();
app.use(express.json()); // as we are going to accept  json data

app.listen(
  PORT,
  console.log(`Express Server is listening on ${PORT}`.yellow.bold)
);

app.get("/", (req, res) => {
  res.send("Welcome to Chat");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes );

app.get("/api/chat/:id", (req, res) => {
  console.log(req.params.id);
  const singlechat = chats.find((c) => c._id === req.params.id);
  res.send(singlechat);
});

// if not api point get found about then this code will run
app.use(notFound);
app.use(errorHandler);
 









