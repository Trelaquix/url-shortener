const express = require("express");
const app = express();
const port = 4000;
const urlRoutes = require("./routes/urlRoutes");
const cors = require("cors"); // Import the cors middleware

app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    })
  );

app.use("/api", urlRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
