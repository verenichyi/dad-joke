# Dad Joke API

---
## Description:
 Command line tool which allows the user to make a request to a https://icanhazdadjoke.com/api API and store the data in a text file

---
## An example of running the app with command line arguments:

* `node index --searchTerm 'hipster'`

  The command line arguments should accept search term argument and your application should make an API request to the dad joke API to search for a joke based on the search term. If it finds jokes matching the term, it should output a random joke among all pages returned by the request, and should also save the joke to a file called jokes.json. If it doesn't find a joke, it should log a message to the console telling the user that no jokes were found for that search term
* `node index --leaderboard`

  The command line arguments should accept leaderboard argument. If that command line argument is passed in, application should return the most popular joke based on how many times it appears in jokes.json
