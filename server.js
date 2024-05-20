const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawnSync } = require('child_process');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.post('/run-script', (req, res) => {
  const { script } = req.body;
  const pythonProcess = spawnSync('python3', ['-c', script]);

  if (pythonProcess.error) {
    res.status(500).json({ output: pythonProcess.error.message });
  } else {
    res.json({ output: pythonProcess.stdout.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});