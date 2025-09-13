// server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

// JSONパースとCORS許可
app.use(express.json());
app.use(cors());

// データ保存ファイル
const DATA_FILE = "./shifts.json";

// シフト取得
app.get("/api/shifts", (req, res) => {
  if (!fs.existsSync(DATA_FILE)) {
    return res.json({});
  }
  const data = fs.readFileSync(DATA_FILE, "utf8");
  res.json(JSON.parse(data));
});

// シフト保存
app.post("/api/shifts", (req, res) => {
  const { year, month, date, shift } = req.body;

  let data = {};
  if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  }

  const key = `${year}-${month + 1}-${date}`;
  data[key] = shift;

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
