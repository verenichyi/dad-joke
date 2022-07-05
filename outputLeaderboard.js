const { promises: fs } = require('fs');
const { logData, sortByMostPopular } = require('./helpers');
const path = require('path');

const jokesPath = path.join(__dirname, 'jokes.json');

const outputLeaderboard = async () => {
  const data = await fs.readFile(jokesPath);
  const fileData = JSON.parse(data.toString());

  logData(`\nLeader board: ${sortByMostPopular(fileData.jokes)[0]}\n`);
};

module.exports = outputLeaderboard;
