
(function(){
    "use strict";

    var myApp = angular.module('myBaseApp.home', ['ui.router']);

    myApp
        .config(function($stateProvider){
            $stateProvider
                .state('home', {
                    url: "/home",
                    templateUrl: "modules/home/home.html",
                    controller: "HomeCtrl"
                })
                .state('home.heaven', {
                    url: "/heaven",
                    templateUrl: "modules/home/heaven.html",
                    controller: "HomeCtrl",
                    onEnter: function(){
                        console.log("in heaven");
                    }
                });
        })
        .controller('HomeCtrl', function ($scope) {
            $scope.greeting = "Hello world!";
        });
})();

