function HomeCtrl($scope, apiService) {
    var vm = this;
    var loadedCount = 0;

    vm.bestLectures = [];
    vm.bestTeachers = [];

    init();

    function init() {
        $scope.$emit('REQUEST_AJAX');

        apiService.getLectures({
            start: 0,
            num: 3,
            order_by: 'point'
        }).then(
            function (res) {
                loadedCount++;
                vm.bestLectures = res;

                if (loadedCount === 2) {
                    $scope.$emit('RESPONSE_AJAX');
                }
            },

            function (err) {
                loadedCount++;
                $scope.$emit('ERROR', {
                    error: err
                });

                if (loadedCount === 2) {
                    $scope.$emit('RESPONSE_AJAX');
                }
            }
        );

        apiService.getBestTeachers().then(
            function (res) {
                loadedCount++;

                vm.bestTeachers = res;

                if (loadedCount === 2) {
                    $scope.$emit('RESPONSE_AJAX');
                }
            },

            function (err) {
                loadedCount++;
                $scope.$emit('ERROR', {
                    error: err
                });
                if (loadedCount === 2) {
                    $scope.$emit('RESPONSE_AJAX');
                }
            }
        );
    }
}

HomeCtrl.$inject = ['$scope', 'apiService'];

module.exports = {
    name: 'HomeCtrl',
    fn: HomeCtrl
};
