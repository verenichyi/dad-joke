const commandLineArgs = {
  searchTerm: '--searchTerm',
  leaderboard: '--leaderboard',
};

const notFoundText = 'No jokes were found for that search term.';
const notFoundCommand = "command doesn't exist\n";

module.exports = {
  commandLineArgs,
  notFoundText,
  notFoundCommand,
};
