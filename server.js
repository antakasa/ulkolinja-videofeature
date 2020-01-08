const express = require('express');
const cors = require('cors');
const gitApi = require('@tinacms/api-git');

const server = express();
const port = parseInt(process.env.PORT, 10) || 3001;

server.use(cors());
server.use('/___tina', gitApi.router({pushOnCommit: false}));

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
