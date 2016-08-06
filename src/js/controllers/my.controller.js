function MyCtrl($scope, tokenFactory, apiService) {
    var vm = this;
    var initLoaded = 0;

    vm.listeningLectures = [];
    vm.myLectures = [];

    vm.logout = function () {
        $scope.$emit('REQUEST_AJAX');

        apiService.logout().then(
            function () {
                tokenFactory.removeCookies();
                $scope.$emit('RESPONSE_AJAX');

                window.youngs.setMessage(-1);
            },
            function (err) {
                $scope.$emit('RESPONSE_AJAX');
                $scope.$emit('ERROR', {
                    error: err
                });
            }
        );
    };

    vm.addLecture = function () {
        window.youngs.setMessage(-2);
    };

    init();

    function init() {
        $scope.$emit('REQUEST_AJAX');

        apiService.getLectures({ is_attended: true }).then(
            function (res) {
                initLoaded++;

                vm.listeningLectures = res;

                if (initLoaded === 2) {
                    $scope.$emit('RESPONSE_AJAX');
                }
            },

            function (err) {
                initLoaded++;
                $scope.$emit('ERROR', {
                    error: err
                });

                if (initLoaded === 2) {
                    $scope.$emit('RESPONSE_AJAX');
                }
            }
        );

        apiService.getLectures({ is_teaching: true }).then(
            function (res) {
                initLoaded++;

                vm.myLectures = res;

                if (initLoaded === 2) {
                    $scope.$emit('RESPONSE_AJAX');
                }
            },

            function (err) {
                initLoaded++;
                $scope.$emit('ERROR', {
                    error: err
                });

                if (initLoaded === 2) {
                    $scope.$emit('RESPONSE_AJAX');
                }
            }
        );
    }
}

MyCtrl.$inject = ['$scope', 'tokenFactory', 'apiService'];

module.exports = {
    name: 'MyCtrl',
    fn: MyCtrl
};
