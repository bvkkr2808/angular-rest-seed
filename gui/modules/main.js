
(function(){
    "use strict";

    var myApp = angular.module('myBaseApp', ['ui.router', 'myBaseApp.home']);

    myApp
        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise("/home");
        });
})();

