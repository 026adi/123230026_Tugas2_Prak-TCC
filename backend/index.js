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

const PORT = process.env.PORT || 8080;
sequelize.sync().then(() => {
  console.log("Database synced");

  app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });
});