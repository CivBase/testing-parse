angular.module('disco-biscuit').
    controller('HelloController', ['$scope',
        function($scope) {
            /*
             * TODO
             */
            $scope.sometext = "Bob";

            $scope.update = function() {
                alert('The Hello Controller is working!');
            };

            $scope.update();
        }]);
