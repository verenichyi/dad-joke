const https = require('https');
const path = require('path');
const fs = require('fs').promises;
const { logData } = require('./helpers');
const { notFoundText } = require('./constants');

const jokesPath = path.join(__dirname, 'jokes.json');

const onEnd = async (data) => {
  const jokes = JSON.parse(Buffer.concat(data).toString()).results;

  if (jokes.length) {
    try {
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)].joke;
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
};

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
      .on('end', () => onEnd(data));
  });

  request.on('error', (error) => {
    logData(error);
  });

  request.end();
};

module.exports = outputDadJoke;
