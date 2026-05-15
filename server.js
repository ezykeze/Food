const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
    process.exit(1); // Stop the server if DB fails
  } else {
    console.log("MySQL Connected!");
    // Now start the server
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  }
});

// Get all foods
app.get("/foods", (req, res) => {
  db.query("SELECT * FROM foods", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Place order
app.post("/order", (req, res) => {
  const { food_id, quantity } = req.body;

  db.query(
    "INSERT INTO orders (food_id, quantity) VALUES (?, ?)",
    [food_id, quantity],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Order placed!");
    }
  );
});