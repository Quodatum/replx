angular.module(
    'replx',
    ['ui.router',
     'ngResource',
     'ngAnimate',
     'ngSanitize',
     'ui.bootstrap',
     'restangular',
     'ui.ace',
     'replx.term',
	 'quodatum.directives', 'quodatum.config' 
     ])

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
            templateUrl : '/static/replx/templates/search.xhtml',
            controller : "SearchCtrl"
          })

          .state('error', {
            url : "/error",
            templateUrl : '/static/replx/templates/error.xhtml'
          })

          .state('about', {
            url : "/about",
            templateUrl : '/static/replx/templates/about.xhtml',
			 ncyBreadcrumb: { label: 'Home',icon:'glyphicon glyphicon-home'}
          })

          .state('404', {
            url : "/404",
            templateUrl : '/static/replx/templates/404.xhtml'
          })
          
         
          ;
          // $urlRouterProvider.when('', '/term');  
          $urlRouterProvider.otherwise('/404');  
          // use the HTML5 History API
          // $locationProvider.html5Mode(true);
        } ])
		
.controller("HomeCtrl",
    [ "$scope", "$location", function($scope, $location) {
      console.log("HomeCtrl");
     $location.path('/term')
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
        
// set height on element to extend to window
// http://stackoverflow.com/a/23044603/3210344
.directive('resize', function ($window) {
    return function (scope, element, attr) {

        var w = angular.element($window);
        scope.$watch(function () {
            return {
                'h': window.innerHeight, 
                'w': window.innerWidth
            };
        }, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.heightWithOffset = function (offsetH) {
                scope.$eval(attr.notifier);
                return  (newValue.h - offsetH) + 'px' ;                   
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
})
       
;
