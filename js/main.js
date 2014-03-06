var TimerApp = angular.module('Timer', []);
TimerApp.controller('MainCtrl', function($scope, $interval) {

  // Strings used in UI.
  $scope.strings = {
    Start: 'Start',
    Pause: 'Pause',
    Reset: 'Reset'
  }
  $scope.toggleLabel = $scope.strings.Start;

  $scope.TotalTime = 12;
  $scope.TimeRemaining = 0;

  var inter;

  // Creates global timer and kicks it off.
  $scope.ToggleTimer = function() {
    // Timer is already running - pause it.
    if (!!inter) {
      $scope.PauseTimer();

    // Starts a new timer.
    } else if ($scope.TimeRemaining > 0) {
      $scope.ResumeTimer();
    } else {
      $scope.StartNewTimer();
    }
  };

  $scope.StartNewTimer = function() {
    $scope.TimeRemaining = $scope.TotalTime;
    $scope.ResumeTimer();
  };

  $scope.ResumeTimer = function() {
    $scope.toggleLabel = $scope.strings.Pause;
    inter = $interval($scope.tick, 100);
  };

  // Kills internal timer object.
  $scope.PauseTimer = function() {
    $scope.toggleLabel = $scope.strings.Start;
    $interval.cancel(inter);
    inter = undefined;
  };

  $scope.ResetTimer = function() {
    $scope.PauseTimer();
    $scope.TimeRemaining = 0;
  };

  $scope.tick = function() {
    if ($scope.TimeRemaining <= 0) {
      $scope.CompleteCycle();
      $scope.ResetTimer();
      $scope.StartNewTimer();

    } else {
      $scope.TimeRemaining = Math.round(($scope.TimeRemaining - .1) * 10) / 10;
    }
  };

  $scope.CompleteCycle = function() {
    // Play a sound.
  };


});

// Applies Math.ceil and pads out with spaces.
TimerApp.filter('formatSecs', function() {
  return function(input) {
    var capped = Math.ceil(input).toString();
    if (capped.length < 2) {
      capped = '0' + capped;
    }
    return capped;
  };
});