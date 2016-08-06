function HeaderCtrl($state) {
    var vm = this;

    vm.headerMenu = [
        { id: 0, name: 'Home', value: 'main.home' },
        { id: 1, name: 'Live', value: 'main.study' },
        { id: 2, name: 'My', value: 'main.my' }
    ];
    vm.selectedMenu = vm.headerMenu[0];

    vm.onSelectMenuItem = function (menuItem) {
        $state.go(menuItem.value);
    };
}

HeaderCtrl.$inject = ['$state'];

module.exports = {
    name: 'HeaderCtrl',
    fn: HeaderCtrl
};
