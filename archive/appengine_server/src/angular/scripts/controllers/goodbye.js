angular.module('disco-biscuit').
    controller('GoodbyeController', ['$scope', 'api', 'fetchAll',
        function($scope, api, fetchAll) {
            /*
             * TODO
             */
            $scope.models = [];

            $scope.update = function() {
                alert('The Goodbye Controller is working!');
            };

            $scope.submit = function(str) {
                // do something
            };

            $scope.refresh = function() {
                var params = {
                    'verbose': true,
                    'limit': 5
                };

                var callback = function(data) {
                    $scope.refreshing = false;
                };

                var handleBatch = function(data) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.models.push(data[i]);
                    }
                };

                var errorHandler = function() {
                    alert('There was an api error!');
                };

                $scope.models = [];
                $scope.refreshing = true;
                fetchAll(api.StrModel, params, callback, handleBatch, errorHandler);
            };

            $scope.update();
        }]);
