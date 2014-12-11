
(function(){
    "use strict";

    var myApp = angular.module('myBaseApp.home', []);

    myApp
        .controller('HomeCtrl', function ($scope) {
            $scope.greeting = "Hello world!";
        });
})();

