var includes = require('lodash/includes');
var remove = require('lodash/remove');

function StudySelectCtrl($scope, studyFilterService, Constants) {
    var vm = this;

    vm.filter = studyFilterService.getFilter();
    vm.selectType = function (item) {
        if (item.value === 'all') {
            vm.filter = 'all';
            return;
        }

        if (vm.filter === 'all') {
            vm.filter = [];
        }

        if (includes(vm.filter, item.value)) {
            remove(vm.filter, function (val) {
                return val === item.value;
            });
        } else {
            vm.filter.push(item.value);
        }

        if (vm.filter.length === Constants.typeMenu.length - 1) {
            vm.filter = 'all';
        }
    };

    vm.isTypeIncluded = function (itemValue) {
        if (vm.filter === 'all') return false;

        return includes(vm.filter, itemValue);
    };

    vm.submitSelectFilter = function () {
        studyFilterService.setFilter(vm.filter);
        vm.filter = null;
        window.history.back();
    };
}

StudySelectCtrl.$inject = ['$scope', 'studyFilterService', 'Constants'];

module.exports = {
    name: 'StudySelectCtrl',
    fn: StudySelectCtrl
};
