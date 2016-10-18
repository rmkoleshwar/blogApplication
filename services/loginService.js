/* global sessoinService, angular */

'use strict';
angular.module('app')
    .factory('loginService',function($http,$location,sessionService){
        return {
            login:function(data,scope){
                var $promise = $http.post('data/user.php',data);//send data to user.php
                $promise.then(function(msg){
                    var uid = msg.data;
                    if(uid)
                    {
                        //scope.msgtxt = 'correct information';
                        sessionService.set('user'.uid);
                        $location.path('/profile1');
                    }
                    else
                    {
                        //scope.msgtxt = 'incorrect information';
                        $location.path('/login');
                    }
                });
            },
            logout : function(){
                sessoinService.destroy('user');
                $location.path('/login');
            },
            
            islogged:function(){
                if(sessionService.get('user')) return true;
            }
        };
    });
        
