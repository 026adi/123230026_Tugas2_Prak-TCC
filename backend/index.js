require('dotenv').config(); // WAJIB PALING ATAS

const cors = require("cors");
const express = require("express");
const sequelize = require("./config/database");
const notesRoutes = require("./routes/notesRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/notes", notesRoutes);

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
});