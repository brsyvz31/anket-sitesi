const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// RAM database
let surveys = [];

// anket oluştur
app.post("/survey", (req, res) => {
  const survey = {
    id: Date.now().toString(),
    question: req.body.question,
    options: req.body.options,
    votes: req.body.options.map(() => 0)
  };

  surveys.push(survey);
  res.json(survey);
});

// anketleri getir
app.get("/survey", (req, res) => {
  res.json(surveys);
});

// oy ver
app.post("/vote/:id", (req, res) => {
  const survey = surveys.find(s => s.id === req.params.id);
  survey.votes[req.body.optionIndex]++;
  res.json(survey);
});

app.listen(3000, () => {
  console.log("Server çalışıyor: http://localhost:3000");
});