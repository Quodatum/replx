angular.module(
    'replx',
    [  'ui.router', 'ngResource', 'ngAnimate','ngSanitize', 'ui.bootstrap', 'restangular'
        
		 ])
/*
.constant("apiRoot", "../../replx/")

.config(
    [ '$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
          $stateProvider
		  
          .state('home', {
            url : "",
            controller : "HomeCtrl"
          })
		  
          .state('search', {
            url : "/search?q",
            templateUrl : '/static/doc/templates/search.xhtml',
            controller : "SearchCtrl"
          })

          .state('error', {
            url : "/error",
            templateUrl : '/static/doc/templates/error.xhtml'
          })

          .state('about', {
            url : "/about",
            templateUrl : '/static/doc/templates/about.xhtml',
			 ncyBreadcrumb: { label: 'Home',icon:'glyphicon glyphicon-home'}
          })

          .state('404', {
            url : "/404",
            templateUrl : '/static/doc/templates/404.xhtml'
          });
        //  $urlRouterProvider.when('', '/about');  
          $urlRouterProvider.otherwise('/404');  
          // use the HTML5 History API
          // $locationProvider.html5Mode(true);
        } ])
		
.controller("HomeCtrl",
    [ "$scope", "$location", function($scope, $location) {
      console.log("HomeCtrl");
     $location.path('/about')
    } ])
	
.controller("AppController",
    [ "$scope", "$location", function($scope, $location) {
      console.log("AppController");
      $scope.search = {};
      $scope.doSearch = function() {
        $location.path("/search").search({
          q : $scope.search.q
        });
      };
    } ])

.controller(
    "SearchCtrl",
    [ 'Restangular', '$location', '$scope', '$stateParams',
        function(Restangular, $location, $scope, $stateParams) {
          console.log("Search Init", $stateParams);
          $scope.search.q = $stateParams.q;
          function search(q) {
            console.log("search:",$scope.search );
            Restangular.all("search").getList({
              q : $scope.search.q
            }).then(function(d) {
              console.log(d);
              $scope.results = d;
            })
          }
          ;

          $scope.doSearch = function() {
            search($scope.search.q);
          };
          search($scope.search.q);
        } ])
*/        
;
