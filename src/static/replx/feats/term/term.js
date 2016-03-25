/*
*
*/

angular.module(
    'replx.term',
    ['ui.router',
     'restangular',
     'ui.ace',
     'angular-growl'
     ])
     
.config(
    [ '$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
          $stateProvider
          
          .state('term', {
            url : "/term",
            template:"<ui-view>ttt</ui-view>",
            abstract:true
          })
          .state('term.new', {
            url : "",
            templateUrl : '/static/replx/feats/term/term.html',
            controller : "TermCtrl"
          })
          
          .state('term.item', {
            url : "/:item",
            templateUrl : '/static/replx/feats/term/saved.html',
            controller : "SavedCtrl"
          })
    }])
    
  .controller("SavedCtrl",
    [ "$scope", "$location", "Restangular","growl",function($scope, $location,Restangular,growl) {
      console.log("SavedCtrl"); 
      $scope.data={"id":6,
									"xquery":"2 to 7",
									"result":"not yet"
									};
      }])
      
.controller("TermCtrl",
    [ "$scope", "$location", "Restangular","growl",function($scope, $location,Restangular,growl) {
      console.log("TermCtrl");
      $scope.modes = ['XQuery', 'XML', 'Javascript'];
      $scope.mode = $scope.modes[0];
     
      $scope.send=function(){
        console.log("SEND",$scope.aceModel); 
        var data={"xq":$scope.aceModel};
        var _start = performance.now();
        Restangular.all("xq").post("ping",data).then(function(r) {
          $scope.postMs = Math.floor(performance.now() - _start);
          growl.success(r, {
            title : 'POST  ' +  $scope.postMs + ' ms.'
          });
        });
       };
      // The ui-ace option
      $scope.aceOption = {
        mode: $scope.mode.toLowerCase(),
        workerPath: '/static/replx/work',
        onLoad: function (_editor) {
          // https://github.com/angular-ui/ui-ace/issues/104#issuecomment-142867871
          // This is to remove following warning message on console:
          // Automatically scrolling cursor into view after selection change this will be disabled in the next version
          // set editor.$blockScrolling = Infinity to disable this message
          _editor.$blockScrolling = Infinity;
          // HACK to have the ace instance in the scope...
          $scope.modeChanged = function () {
            _editor.getSession().setMode("ace/mode/" + $scope.mode.toLowerCase());
          };
     
        },
      require: ['ace/ext/language_tools'],
      advanced: {
          enableSnippets: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true
      }
      };
     
      // Initial code content...
      $scope.aceModel = '(: just add xquery2 :)' ;
      
     
       $scope.move=function(diff){
         alert("move: "+diff); 
      };
    } ])