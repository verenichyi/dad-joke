const https = require('https');
const path = require('path');
const fs = require('fs').promises;
const {
  commandLineArgs,
  notFoundText,
  notFoundCommand,
} = require('./constants');
const { sortByMostPopular, logData } = require('./helpers');

const args = process.argv.slice(2);
const jokesPath = path.join(__dirname, 'jokes.json');

const outputDadJoke = (search) => {
  const options = {
    hostname: 'icanhazdadjoke.com',
    path: `/search?term=${search}`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };

  const request = https.request(options, (res) => {
    const data = [];

    res
      .on('data', (chunk) => {
        data.push(chunk);
      })
      .on('end', async () => {
        const jokes = JSON.parse(Buffer.concat(data).toString()).results;

        if (jokes.length) {
          try {
            const randomJoke =
              jokes[Math.floor(Math.random() * jokes.length)].joke;
            const data = await fs.readFile(jokesPath);
            const fileData = JSON.parse(data.toString());
            fileData.jokes.push(randomJoke);

            logData(`\nRandom joke: ${randomJoke}\n`);
            await fs.writeFile(jokesPath, JSON.stringify(fileData));
          } catch (error) {
            logData(error);
          }
        } else {
          logData(notFoundText);
        }
      });
  });

  request.on('error', (error) => {
    logData(error);
  });

  request.end();
};

const outputLeaderboard = async () => {
  const data = await fs.readFile(jokesPath);
  const fileData = JSON.parse(data.toString());

  logData(`\nLeader board: ${sortByMostPopular(fileData.jokes)[0]}\n`);
};

args.forEach((arg, index) => {
  const { searchTerm, leaderboard } = commandLineArgs;

  switch (arg) {
    case searchTerm:
      {
        outputDadJoke(args[index + 1]);
      }
      break;
    case leaderboard:
      {
        outputLeaderboard();
      }
      break;
    default: {
      const commandsArr = Object.values(commandLineArgs);

      if (!commandsArr.includes(arg) && arg.includes('--'))
        logData(`${args[index]} ${notFoundCommand}`);
    }
  }
});

// (() => {})();
