(function () {
    'use strict';

    app.controller('HomeCtrl', ['$scope', 'FetchFileFactory', function($scope, FetchFileFactory) {
        $scope.fileViewer = 'Please select a file to view its contents';

        $scope.nodeSelected = function(error, data) {
            var _l = data.node.original.li_addr;
            if(_l.isLeaf) {
                FetchFileFactory.fetchFile(_l.base).then(function(data){
                    var _d = data.data;
                    if(typeof _d == 'object') {
                        _d = JSON.stringify(_d, undefined, 2);
                    }
                    $scope.fileViewer = _d;
                });
            }
            else {
                $scope.$apply(function() {
                    $scope.fileViewer = 'Please select a file to view its contents';
                });
            }
        };
    }]);
})();