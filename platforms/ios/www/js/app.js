playgroundApp = angular.module('PlaygroundApp', ['ngRoute', 'ngTouch', 'ngMap']);

isPhoneGap = function(){
	return (typeof cordova !== 'undefined' || typeof PhoneGap !== 'undefined' || typeof phonegap !== 'undefined')
		&& /^file:\/{3}[^\/]/i.test(window.location.href)
		&& /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
}

initApp = function(){
	angular.bootstrap(document, ['PlaygroundApp']);
};

angular.element(document).ready(function() {
	if (isPhoneGap()) {
		document.addEventListener('deviceready', function() {
			initApp();
		}, false);
	}
	else {
		initApp();
	}
});

playgroundApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'views/index.html',
			controller:  'IndexController'
		}).
		when('/dialogs', {
			templateUrl: 'views/dialogs.html',
			controller:  'DialogsController'
		}).
		when('/geo', {
			templateUrl: 'views/geo.html',
			controller:  'GeoController'
		}).
		when('/photo', {
			templateUrl: 'views/photo.html',
			controller:  'PhotoController'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);

playgroundApp.run(['$rootScope', function($rootScope){
	$rootScope.platform = typeof device !== 'undefined' ? device.platform : 'Unknown';

	document.addEventListener("resume", function(){
		//alert('App re-opened from background!');
	}, false);

	document.addEventListener("pause", function(){
		//alert('App sent to background!');
	}, false);

	document.addEventListener("online", function(){
		$rootScope.isOnline = 1;
	}, false);

	document.addEventListener("offline", function(){
		$rootScope.isOnline = 2;
	}, false);

	window.addEventListener("batterycritical", function(){ console.log('Battery Critical!!!'); }, false);
	window.addEventListener("batterylow", function(){ console.log('Battery Low!'); }, false);

	window.addEventListener("batterystatus", function(level, isPlugged){
		//$rootScope.batteryLevel = level;
		//$rootScope.phonePlugged = isPlugged;
	}, false);
}]);