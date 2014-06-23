(function() {
	playgroundApp.controller('IndexController', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout){

	}]);

	playgroundApp.controller('DialogsController', ['$scope', '$http', function($scope){
		$scope.alert = function(){
			navigator.notification.alert('You are the winner!', null, 'Game Over', 'Done');
		};

		$scope.confirm = function(){
			navigator.notification.confirm('You are the winner!', function(buttonIndex){
				console.log(buttonIndex);
			}, 'Game Over', ['Done', 'Cancel']);
		};

		$scope.prompt = function(){
			function onPrompt(results) {
				alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
			}

			navigator.notification.prompt(
				'Please enter your name',  // message
				onPrompt,                  // callback to invoke
				'Registration',            // title
				['Ok','Exit'],             // buttonLabels
				'Jane Doe'                 // defaultText
			);
		};

		$scope.beep = function(){
			navigator.notification.beep(2);
		};
	}]);

	playgroundApp.controller('GeoController', ['$scope', function($scope){
		$scope.getlocation = function(){
			navigator.geolocation.getCurrentPosition(
				function(position) {
					var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					$scope.map.panTo(location);
					var locationMarker = new google.maps.Marker({
						title: "Your Location",
						position: location,
						map: $scope.map,
						animation: google.maps.Animation.BOUNCE
					});
				},
				function() {
					alert('Error getting location');
				});
		};
	}]);

	playgroundApp.controller('PhotoController', ['$scope', function($scope){
		$scope.takephoto = function(){
			navigator.camera.getPicture(
				function(imageData) {
					document.getElementById('imagepreview').src = "data:image/jpeg;base64," + imageData;
				},
				function() {
					alert('Error taking picture', 'Error');
				},
				{
					quality: 50,
					destinationType: Camera.DestinationType.DATA_URL,
					sourceType: Camera.PictureSourceType.CAMERA,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: 600,
					targetHeight: 600
				});
		};

		$scope.fromalbum = function(){
			navigator.camera.getPicture(
				function(imageData) {
					document.getElementById('imagepreview').src = "data:image/jpeg;base64," + imageData;
				},
				function() {
					alert('Error taking picture', 'Error');
				},
				{
					quality: 50,
					destinationType: Camera.DestinationType.DATA_URL,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: 600,
					targetHeight: 600
				});
		};
	}]);
})();