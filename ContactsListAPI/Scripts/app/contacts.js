/* client javascript code here */
angular.module('myApp', []).controller('contactListCtrl', function ($scope, $http) {

    $scope.refresh = function () {
        $scope.status = "Refreshing Contacts...";
        $http({
            method: 'GET',
            url: '/api/contacts',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (results) {
            $scope.contacts = results.data;
            $scope.status = "Contacts loaded";
        }, function (err) {
            $scope.status = "Error loading contacts";
        });
    };

    $scope.create = function () {
        $scope.status = "Creating a new contact";

        $http({
            method: 'POST',
            url: '/api/contacts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'Id': $scope.newId,
                'Name': $scope.newName,
                'EmailAddress': $scope.newEmail,
                'CreatedBy': 'Guest'
            }
        }).success(function (data) {
            $scope.status = "Contact created";
            $scope.refresh();
            $scope.newId = 0;
            $scope.newName = '';
            $scope.newEmail = '';
        });
    };

    $scope.delete = function (id) {
        $scope.status = "Deleting contact";
        $http({
            method: 'DELETE',
            url: '/api/contacts/' + id
        }).success(function (data) {
            $scope.status = "Contact deleted";
            $scope.refresh();
        });
    };

    $scope.refresh();
});