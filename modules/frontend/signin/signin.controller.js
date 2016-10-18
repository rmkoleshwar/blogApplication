/* global angular */

angular.module('app')


.controller ('SigninCtrl',['$location','$scope','$http', '$log','sessionService',function($location,$scope ,$http, $log,sessionService){
        //checking blog record to database
        $scope.signinformsubmit = function ($param) {
            $log.info($param);
            console.log($param.useremail);
            if($param.username != '' && $param.password != '')
            {
                $http.post('./scripts/userRegistration.php?methodName=signin', $param)
                        .success(function (data) {
                            if(data.status == 'success'){
                                //console.log(data.data);
                                var uid       = data.session.uid;
                                var email     = data.session.email;
                                var firstName = data.session.firstName;
                                var lastName  = data.session.lastName;
                                if(uid)
                                {
                                    sessionService.set('uid',uid);
                                    sessionService.set('email',email);
                                    sessionService.set('firstName',firstName);
                                    sessionService.set('lastName',lastName);
                                    $location.path('/profile');
                                }
                                else
                                {
                                    $location.path('/signin');
                                }
                                
                            }
                            else
                            {
                                $scope.commonerror = true;
                                $scope.errormsg    = data.msg;
                            }
                            
                        })
                        .error(function (err) {
                            $log.info(err);
                        });
            }
            else
            {
                $scope.commonerror = true;
                $scope.errormsg = 'Please enter email and/or password!';
            }
        };
        
        $scope.fbsignin = function () {
            //alert("in fbsignin");
            $http.post('./facebook/fbsignin.php')
                .success(function (data) {
                    if(data.status == 'success'){
                        //console.log(data.data);
                        var uid       = data.session.uid;
                        var email     = data.session.email;
                        var firstName = data.session.firstName;
                        var lastName  = data.session.lastName;
                        if(uid)
                        {
                            sessionService.set('uid',uid);
                            sessionService.set('email',email);
                            sessionService.set('firstName',firstName);
                            sessionService.set('lastName',lastName);
                            $location.path('/profile');
                        }
                        else
                        {
                            $location.path('/signin');
                        }

                    }
                    else
                    {
                        alert('else part');
                        //$scope.commonerror = true;
                        //$scope.errormsg    = data.msg;
                    }

                })
                .error(function (err) {
                    $log.info(err);
                });

        };

}]);