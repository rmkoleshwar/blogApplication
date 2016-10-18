angular.module('app')


.controller ('SignupCtrl',['$location','$scope','$http', '$log',function($location,$scope ,$http, $log){
    $scope.signupformsubmit = function ($param) {
            console.log($param);
            $log.info($param);
            
            var password = $param.password;
            var confirmpassword = $param.confirm_password;
            if (password.length < 5) {
                $scope.commonerror = true;
                $scope.errormsg = 'password must be at least 5 characters long!';
            } else if (angular.equals(password, confirmpassword) == false)
            {
                $scope.commonerror = true;
                $scope.errormsg = 'password and confirm password must be same!';
            } 
            else
            {
                $http.post('./scripts/userRegistration.php?methodName=signup', $param)
                .success(function (data) {
                    
                    if(data.status == "error")
                    {
                        $scope.commonerror = true;
                        $scope.errormsg    = data.msg;
                    }
                    else{
                        //if success
                        $location.path('/signin')
                    }
                })
                .error(function (err) {
                    $log.info(err);
                });
                
            }
        };
}])