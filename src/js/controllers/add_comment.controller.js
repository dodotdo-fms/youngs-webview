var escape = require('lodash/escape');
var isEmpty = require('lodash/isEmpty');

function AddCommentCtrl($scope, $state, apiService) {
    var vm = this;

    vm.rate = 5;
    vm.content = '';

    vm.selectRate = function (rate) {
        vm.rate = rate;
    };

    vm.onSubmitRate = function () {
        var lectureId = $state.params.lectureId;

        if (isEmpty(vm.content)) {
            $scope.$emit('NO_INPUT');
            return;
        }

        $scope.$emit('REQUEST_AJAX');

        apiService.postReview(lectureId, vm.rate, escape(vm.content)).then(
            function () {
                $scope.$emit('RESPONSE_AJAX');
                window.history.back();
            },

            function (err) {
                $scope.$emit('RESPONSE_AJAX');
                $scope.$emit('ERROR', {
                    error: err
                });
            }
        );
    };
}

AddCommentCtrl.$inject = ['$scope', '$state', 'apiService'];

module.exports = {
    name: 'AddCommentCtrl',
    fn: AddCommentCtrl
};
