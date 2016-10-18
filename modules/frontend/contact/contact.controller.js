angular.module('app')


.controller ('ContactCtrl',['$scope','$http', '$log',function($scope ,$http, $log){
        $scope.contactusformsubmit = function ($param) {
            $log.info($param);
            console.log($param.useremail);
            $http.post('./scripts/contactUs.php?methodName=add', $param)
                    .success(function (data) {
                        if(data.status == 'success'){
                            //clear form data
                            $param.username = '';
                            $param.useremail = '';
                            $param.phonenumber = '';
                            $param.comment = '';

                            //show success message
                            $scope.commonsuccess = true;
                            $scope.successmsg    = data.msg;
                        }
                        else
                        {
                            //show error message
                            $scope.commonerror = true;
                            $scope.errormsg    = data.msg;
                        }

                    })
                    .error(function (err) {
                        $log.info(data.msg);
                    });
        };
}])