/* global angular */

angular.module('app', ['ngRoute'])

.config(function($routeProvider) {
	$routeProvider

        //frontend routs
	.when('/', 
        {
            templateUrl : 'modules/frontend/home/home.view.html',
            controller  : 'HomeCtrl'
	})
	.when('/about', 
        {
            templateUrl : 'modules/frontend/about/about.view.html',
            controller  : 'AboutCtrl'
	})
        .when('/contact', 
        {
            templateUrl : 'modules/frontend/contact/contact.view.html',
            controller  : 'ContactCtrl'
	})
        .when('/blog', 
        {
            templateUrl : 'modules/frontend/blog/blog.view.html',
            //templateUrl : 'modules/frontend/blog/blogDetail.view.html',
            controller  : 'BlogCtrl'
	})
        
	.when('/signin', 
        {
            templateUrl : 'modules/frontend/signin/signin.view.html',
            controller  : 'SigninCtrl'
	})
	.when('/signup',
        {
            templateUrl : 'modules/frontend/signup/signup.view.html',
            controller  : 'SignupCtrl'
	})
	.when('/profile',
        {
            templateUrl : 'modules/frontend/user_dashboard/profile.view.html',
            controller  : 'ProfileCtrl'
	})
        
        //backend routs
        .when('/backend', 
        {
            templateUrl : 'modules/backend/home/home.view.html',
            controller  : 'HomeCtrl'
	})
        .when('/backend/blog', 
        {
            templateUrl : 'modules/backend/blog/blog.view.html',
            controller  : 'BlogCtrl'
	})
	.otherwise({
            templateUrl : 'modules/frontend/common/404.view.html'
	});
        
});

//CKEDITOR Directives
angular.module('app')
    .directive('ckEditor', function () {
        return {
            require: '?ngModel',
            link: function (scope, elm, attr, ngModel) {
                var ck = CKEDITOR.replace(elm[0]);
                if (!ngModel)
                    return;
                ck.on('instanceReady', function () {
                    ck.setData(ngModel.$viewValue);
                });
                function updateModel() {
                    scope.$apply(function () {
                        ngModel.$setViewValue(ck.getData());
                    });
                }
                ck.on('change', updateModel);
                ck.on('key', updateModel);
                ck.on('dataReady', updateModel);

                ngModel.$render = function (value) {
                    ck.setData(ngModel.$viewValue);
                };
            }
        };
    });
    
    angular.module('app')
            .filter('stripTags', function() {
	return function(text) {
		return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
	};
});
angular.module('app').filter('unsafe', function($sce) { return $sce.trustAsHtml; });