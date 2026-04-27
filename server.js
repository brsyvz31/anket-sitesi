const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let surveys = [];

// ANKET OLUŞTUR
app.post("/survey", (req, res) => {
  const { question, options } = req.body;

  const newSurvey = {
    id: Date.now().toString(),
    question,
    options,
    votes: options.map(() => 0)
  };

  surveys.push(newSurvey);
  res.json(newSurvey);
});

// ANKETLERİ GETİR
app.get("/survey", (req, res) => {
  res.json(surveys);
});

// OY VER
app.post("/vote/:id", (req, res) => {
  const survey = surveys.find(s => s.id === req.params.id);

  if (!survey) return res.status(404).send("Anket bulunamadı");

  survey.votes[req.body.optionIndex]++;
  res.json(survey);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server çalışıyor");
});