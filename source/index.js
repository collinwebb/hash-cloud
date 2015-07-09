'use strict';

var app = angular.module('sif', ['firebase', 'ui.router']);

app.controller("mainCtrl", function($scope, twitterUser) {
  $scope.data = {tags: [], people: {}};
  $scope.tweet = "";

  $scope.search = function() {
    twitterUser.search($scope.words)
    .success(function(data) {
      $scope.data = data;
    })
    .catch(function(error) {
      console.log(error);
    });

    return false;
  };

  $scope.sendTweet = function() {
    twitterUser.sendTweet($scope.tweet)
    .success(function(resp) {
      $scope.tweet = "";
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  $scope.includeInTweet = function(tag) {
    $scope.tweet = $scope.tweet + " " + tag;
  };

  $scope.follow = function (screenName){
    twitterUser.follow(screenName)
    .success(function(data) {
      $scope.data.people[screenName].following = true;
    })
    .catch(function(error) {
      console.log(error);
    });
  };
});
