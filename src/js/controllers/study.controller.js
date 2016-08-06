var forEach = require('lodash/forEach');
var groupBy = require('lodash/groupBy');

function StudyCtrl($scope, apiService) {
    var vm = this;

    vm.lectureGroup = [];

    init();

    function init() {
        $scope.$emit('REQUEST_AJAX');

        apiService.getLectures({
            status: 'STANDBY'
        }).then(
            function (res) {
                var id = 0;

                $scope.$emit('RESPONSE_AJAX');

                forEach(groupBy(res, 'type'), function (list, type) {
                    vm.lectureGroup.push({
                        id: id++,
                        type: type,
                        list: list
                    });
                });
            },
            function (err) {
                $scope.$emit('RESPONSE_AJAX');
                $scope.$emit('ERROR', {
                    error: err
                });
            }
        );
    }
}

StudyCtrl.$inject = ['$scope', 'apiService'];

module.exports = {
    name: 'StudyCtrl',
    fn: StudyCtrl
};
