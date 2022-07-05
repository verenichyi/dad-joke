const sortByMostPopular = (array) => {
  const temp = array.reduce((acc, cur) => {
    acc[cur] = acc[cur] ? acc[cur] + 1 : 1;

    return acc;
  }, {});

  return Object.keys(temp).sort((a, b) => temp[b] - temp[a]);
};

const logData = (data) => {
  process.stdout.write(data);
};

module.exports = { sortByMostPopular, logData };
