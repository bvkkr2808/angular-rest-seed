
(function(){
    "use strict";

    var myApp = angular.module('myBaseApp', ['ngRoute', 'myBaseApp.home']);

    myApp
        .config(function ($routeProvider) {
            $routeProvider.when(
                "/home", {
                    templateUrl: "modules/home/home.html",
                    controller: "HomeCtrl"
                }
            ).otherwise({
                    redirectTo: "/home"
                }
            );
        });
})();

