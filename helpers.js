const fs = require('fs');

const sortByMostPopular = (array) => {
  const temp = array.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;

    return acc;
  }, {});

  return Object.keys(temp).sort((a, b) => temp[b] - temp[a]);
};

const readFile = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });

const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        reject(error);
      }
    });
  });

module.exports = { sortByMostPopular, readFile, writeFile };
