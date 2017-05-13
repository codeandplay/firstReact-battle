var axios = require('axios');

var clientID = 'EHNmacWSsYQOCCe0FwT4fgcxmVmWXngE';
var secret = 'V9fedemP7VX41vEnfZ5gGh2wYRSGHejx9en0yD7V5W8IR5d62Zf7puqj7RBbtuhF'
var param = '?client_id=' + clientID + '&client_secret=' + secret;

function getProfile(username) {
  return axios.get('https://api.github.com/users/' + username + param).
    then(function(user){
      return user.data;
    });
}

function getRepo(username){
  return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getStarCount (repos){
  return repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count;
  }, 0);
}

function caculateScore(profile, repos){
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player){
  return axios.all(
    [getProfile(player),
      getRepo(player)]
  ).then(function(data){
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: caculateScore(profile, repos)
    };
  })
}

function sortPlayers(players){
  return players.sort(function(a, b){
    return b.score - a.score;
  });
}

module.exports = {

  battle: function (players) {
    return axios.all(players.map(getUserData)).then(sortPlayers).catch(handleError);
  },

  fetchPopularRepos: function(language){
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI).
      then(function(response){
        return response.data.items;
      });
  }
}
