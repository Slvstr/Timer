var TimerApp = angular.module('Timer', []);

TimerApp.controller('MainCtrl', function($scope, $interval) {

  $scope.TotalTime = 5;
  $scope.TimeRemaining = 0;

  var timer;

  // Creates global timer and kicks it off.
  $scope.StartTimer = function(e) {
    $scope.TimeRemaining = $scope.TotalTime;

    timer = $interval(function() {
      if ($scope.TimeRemaining <= 0) {
        $scope.StopTimer();

      } else {
        $scope.TimeRemaining = $scope.TimeRemaining - 1;
      }
    }, 1000);
  };

  // Kills timer.
  $scope.StopTimer = function() {
    $interval.cancel(timer);
  };

});
