const https = require('https');
const { commandLineArgs, notFoundText } = require('./constants');
const { sortByMostPopular, readFile, writeFile } = require('./helpers');

const args = process.argv;

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
            const data = await readFile('./jokes.json');
            const fileData = JSON.parse(data.toString());
            fileData.jokes.push(randomJoke);

            process.stdout.write(`\nRandom joke: ${randomJoke}\n`);
            await writeFile('./jokes.json', JSON.stringify(fileData));
          } catch (error) {
            process.stdout.write(error);
          }
        } else {
          process.stdout.write(notFoundText);
        }
      });
  });

  request.on('error', (error) => {
    process.stdout.write(error);
  });

  request.end();
};

const outputLeaderboard = async () => {
  const data = await readFile('./jokes.json');
  const fileData = JSON.parse(data.toString());

  process.stdout.write(
    `\nLeader board: ${sortByMostPopular(fileData.jokes)[0]}\n`
  );
};

args.forEach((arg, index) => {
  switch (arg) {
    case commandLineArgs.searchTerm:
      {
        outputDadJoke(args[index + 1]);
      }
      break;
    case commandLineArgs.leaderboard:
      {
        outputLeaderboard();
      }
      break;
  }
});
