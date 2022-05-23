const { commandLineArgs, notFoundCommand } = require('./constants');
const { logData } = require('./helpers');
const outputLeaderboard = require('./outputLeaderboard');
const outputDadJoke = require('./outputDadJoke');

const args = process.argv.slice(2);

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
