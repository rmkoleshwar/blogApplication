/* global angular */

'use strict';

app.factory('imgUploadService', ['$http', function ($http) {
        var urlBase = 'data/';
        var imgUploadService = {};

        //file upload service
        imgUploadService.uploadFileToUrl = function (file) {
            var fd = new FormData();
            fd.append('file', file);
            console.log(file);

            $http.post(urlBase + 'vehicles/uploadFile2.php', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            })
                    .success(function () {
                    })
                    .error(function () {
                    });
        };

    return imgUploadService;

}]);

