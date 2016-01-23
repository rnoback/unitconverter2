(function () {
    'use strict';
    angular.module('converterApp').factory('currencyValueFactory', ['$http', function ($http) {
        return $http.jsonp('http://api.fixer.io/latest?base=EUR&callback=JSON_CALLBACK"', { cache: true });
    }]);
}());