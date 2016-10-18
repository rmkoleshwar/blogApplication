angular.module('app')
    .controller('BlogCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log)
        {
            
            
            //fetching blogs data from db and assign to blogs for listing
            $http.get('./scripts/blogOperation.php?methodName=blogList')
                    .success(function (data) {
                        $scope.blogs = data;
                    })
                    .error(function (err) {
                        $log.error(err);
                    });

            //inserting blog record to database
            $scope.addData = function ($param) {
                
                console.log($param);
                $http.post('./scripts/blogOperation.php?methodName=addData', $param)
                        .success(function (data) {
                            $log.info(data);
                            console.log($param);
                            //clear form data
                            //$param.title = '';
                            //$param.description = '';
                            $scope.blogAddForm = 'false';
                            $scope.addButton = 'true';
                            
                            //shows inserted data instantly
                            $scope.blogs = data;
                        })
                        .error(function (err) {
                            $log.info(err);
                        });
            };

            //update blog record
            $scope.editData = function ($param) {
                //$log.info(param);exit;
                $http.post('./scripts/blogOperation.php?methodName=editData', $param)
                        .success(function (data) {
                            $scope.blogs = data;
                            $scope.blogEditForm = 'false';
                        })
                        .error(function (err) {
                            $log.info(param);
                        });
            };

            //getting exixting record and display to form
            $scope.existingBlogData = function (param) {
                //enable  edit blog form
                $scope.blogEditForm = 'true';

                //assing exixting record to form fields
                $scope.existingBlog = param;

            };

            //remove selected blog form database
            $scope.deleteData = function ($param) {
                var cnfrm = confirm("Are you sure to delete?");

                if (cnfrm)
                {
                    $http.post('./scripts/blogOperation.php?methodName=deleteData', {'id': $param})
                            .success(function (data) {
                                $scope.blogs = data;
                            })
                            .error(function (err) {
                                $log.info(param);
                            });
                }

            };
            
            
            $scope.changeStatus = function($blogId,$blogStatus){
                $http.post('./scripts/blogOperation.php?methodName=changeStatus', {'id': $blogId,'status':$blogStatus})
                            .success(function (data) {
                                $scope.blogs = data;
                            })
                            .error(function (err) {
                                $log.info(param);
                            });
            };
        }]);