angular.module('app')


.controller ('ProfileCtrl',['$location','$scope','sessionService',function($location,$scope,sessionService){
        $scope.txt       = 'Profile Page!!!';
        $scope.uid       = sessionService.get('uid');
        $scope.email     = sessionService.get('email');
        $scope.firstName = sessionService.get('firstName');
        $scope.lastName  = sessionService.get('lastName');
        
        $scope.logout = function ($param) {
            //alert('in logout');
            sessionService.destroy('uid');
            sessionService.destroy('email');
            sessionService.destroy('firstName');
            sessionService.destroy('lastName');
            $location.path('/signin');
        }
}]);