var TimerApp = angular.module('Timer', []);
TimerApp.controller('MainCtrl', function($scope, $interval) {

  // Strings used in UI.
  $scope.strings = {
    Start: 'Start',
    Pause: 'Pause',
    Reset: 'Reset'
  };
  $scope.toggleLabel = $scope.strings.Start;

  $scope.totalMinutes = $scope.totalMinutes || 0;
  $scope.totalSeconds = $scope.totalSeconds || 0;
  $scope.TotalTime = function() {
    return (($scope.totalMinutes * 60 + $scope.totalSeconds) || 30);
  };
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
    $scope.TimeRemaining = $scope.TotalTime();
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
// TimerApp.filter('formatSecs', [ $filter, function($filter) {
//   var dateFilter =  $filter('date');
//   return function(seconds) {
//     var msecs = seconds * 1000;
//     if (seconds >= 60) {
//       return dateFilter(msecs, 'm:ss');
//     }
//     else {
//       return dateFilter(msecs, 'ss');
//     }
//   };
// }]);