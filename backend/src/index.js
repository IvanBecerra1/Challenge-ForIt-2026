const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const task = require('./model/task');
const taskController = require('./controller/taskController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3050;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend running' });
})

// Request Mapping.
app.use('/api/tasks', taskController);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})