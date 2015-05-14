angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate){
  $scope.toggleLeft = function(){
    $ionicSideMenuDelegate.toggleLeft()
  }
})

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
  function initialize() {
   var myLatlng = new google.maps.LatLng(43.115071, -75.301396);
   var myLatlng1 = new google.maps.LatLng(43.093873, -75.298770);
   var myLatlng2 = new google.maps.LatLng(43.092557, -75.318039);
	  
    var mapOptions = {
      center: myLatlng,
      zoom: 13, 
      mapTypeId: google.maps.MapTypeId.ROADMAP
	 
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);  
      
    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div class='Avenue'><a ng-click='clickTest()'>!</a><h1>Coffee Avenue</h1></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });
      
    var imageave = new google.maps.MarkerImage(
    'img/Kaffe-img/logo1.png', 
        new google.maps.Size(40,50),
        new google.maps.Point(0,0),
        new google.maps.Point(50,50)
);

    var imagefox = new google.maps.MarkerImage(
    'img/Kaffe-img/logo3.png'
    , new google.maps.Size(40,50)
    , new google.maps.Point(0,0)
    , new google.maps.Point(15,43)
);

    var imagenerd = new google.maps.MarkerImage(
    'img/Kaffe-img/logo2.png'
    , new google.maps.Size(40,50)
    , new google.maps.Point(0,0)
    , new google.maps.Point(15,43)
);

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: imageave,
      title: 'Ave (Kaffe Market)',
    });

   var marker1 = new google.maps.Marker({
      position: myLatlng1,
      map: map,
      icon: imagefox,
      title: 'Fox (Kaffe Market)'
    });

   var marker2 = new google.maps.Marker({
      position: myLatlng2,
      map: map,
      icon: imagenerd,
      title: 'Nerd (Kaffe Market)'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;

  }

initialize();
	
/* Start to Google Maps in Ionic js */
  google.maps.event.addDomListener(window, 'load', initialize);

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };

})
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});