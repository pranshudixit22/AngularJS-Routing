
var app = angular.module( 'myApp', ["ngRoute"] );

app.config( function ( $routeProvider ) {
	$routeProvider
		.when( "/home", {
			title: 'Home',
			templateUrl: "home.html",
			controller: 'home'
		} )
		.when( '/login', {
			title: 'Login',
			templateUrl: 'login.html',
			controller: 'login'
		} )
		.when( '/signup', {
			title: 'Signup',
			templateUrl: 'emp-change.html',
			controller: 'emp-change'
		} )
		.when( '/emp-data', {
			title: 'Employee-Data',
			templateUrl: 'emp-data.html',
		} )
		.when( '/emp-change', {
			title: 'Employee-Change',
			templateUrl: 'emp-change.html',
			controller: 'emp-change'
		} )
		.when( '/emp-edit', {
			title: 'Employee-Edit',
			templateUrl: 'emp-edit.html',
			controller: 'emp-edit'
		} );

} );

app.service( "dataService", function ( $http ) {
	this.i = '';
	this.getData = function () {
		return $http.get( "mock.json" )
	};
} );

app.controller( "home", function ( $scope ) {
	$scope.text = "Welcome to Employee Portal";
} );

app.controller( "login", function ( $scope ) {
	$scope.text = "Login Page";
} );

app.controller( "signup", function ( $scope ) {
	$location.path( "/emp-edit" );
} );

app.controller("emp-data", function ($scope, dataService, $location) {

    dataService.getData().then
        (function (response) {

            $scope.myData = response.data;

        });

    $scope.deleteItem = function (index) {
        $scope.myData.splice(index, 1);

    }

    $scope.edit = function (index) {
        dataService.i = index;
        $location.path("/emp-edit");
    }
});

app.controller( "emp-change", function ( $scope, dataService ) {

	$scope.addRow = function () {
		$scope.myData.push({
			"id": $scope.id,
			"gender": $scope.gender,
			"name": $scope.name,
			"email": $scope.email,
			"city": $scope.city
		});
		console.log($scope.myData);
	}
} );

app.controller( "emp-edit", function ( $scope, dataService ) {

	$scope.input = $scope.myData[dataService.i];

	$scope.update = function () {
		$scope.myData[dataService.i] = angular.copy( $scope.input );

		console.log( $scope.myData );
	}
} )


