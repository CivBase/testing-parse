angular.module('Services', ['ngResource']);

angular.module('Services').factory('api', ['$resource',
    function($resource){
        /*
         * TODO
         */
        return {
            StrModel: $resource('/service/path1', {}, {query: {method:'GET'}}),
            Service2: $resource('/service/path2', {}, {query: {method:'GET'}})
        }
    }
]);

angular.module('Services').factory('fetch', [function() {
    return function(resource, params, callback, errorHandler) {
        /*
         * TODO
         */
        errorHandler = errorHandler || function(data) {};

        var successHandler = function(data) {
            var dataResults = data.results;
            if (!(dataResults instanceof Array)) {
                dataResults = [dataResults];
            }

            if (data.next) {
                params.cursor = data.next;
            } else {
                params.cursor = null;
            }

            callback(dataResults, params);
        };

        resource.get(params, successHandler, errorHandler);
    }
}]);

angular.module('Services').factory('fetchAll', ['fetch', function(fetch) {
    return function(resource, params, callback, handleBatch, errorHandler) {
        /*
         * TODO
         */
        callback = callback || function(data) {};
        handleBatch = handleBatch || function(data) {};

        var results = [];
        function recursiveFetch(resource, params) {
            var successHandler = function(dataResults, nextParams) {
                handleBatch(dataResults);
                for (var i = 0; i < dataResults.length; i++) {
                    results.push(dataResults[i]);
                }

                if (nextParams.cursor == null) {
                    callback(results);
                    return;
                }

                recursiveFetch(resource, params);
            };

            fetch(resource, params, successHandler, errorHandler);
        }
        recursiveFetch(resource, params);
    }
}]);
